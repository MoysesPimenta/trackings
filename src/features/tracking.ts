import * as Any from 'promise.any';
import { RastreioEvent, RastreioResult } from '../interfaces/rastreio';
import { LinkCorreiosService } from '../services/LinkCorreios.service';
import { MelhorEnvioService } from '../services/MelhorEnvio.service';
import { codeValidator } from '../utils/codeValidator';
import { getEvents } from '../utils/getEvents';
import { siglas } from '../utils/siglasDatabase';

/**
 * Rastreia um ou mais códigos de rastreio
 * @param {string} Códigos
 * @returns {promise}
 */

export async function Tracking(
  rastreios: string | string[]
): Promise<RastreioResult[]> {
  if (!rastreios) throw new Error('Códigos de rastreio não foram informados');

  let lista: string[] = [];

  if (typeof rastreios === 'string') {
    lista.push(rastreios);
  } else {
    lista = [...rastreios];
  }

  const result: RastreioResult[] = [];

  await Promise.all(
    lista.map(async (rastreio) => {
      const start = new Date().getTime();
      try {
        if (!codeValidator(rastreio))
          throw new Error('Código de rastreio inválido');

        const response = await Any([
          MelhorEnvioService(rastreio),
          LinkCorreiosService(rastreio),
        ]);

        const responseTime = new Date().getTime() - start;

        let entregue = false;

        const type = siglas[rastreio.slice(0, 2)] || 'Não identificado';

        if (response.service === 'melhorEnvio') {
          const eventos: RastreioEvent[] = response.data.events
            ? getEvents(response, 'events')
            : getEvents(response, 'event');

          eventos.forEach((item) => {
            if (item.status.toLowerCase().includes('entregue')) entregue = true;
          });

          result.push({
            sucesso: true,
            rastreio,
            eventos,
            responseTime,
            entregue,
            type,
          });
        } else {
          if (response.data.events.length === 0)
            throw new Error('Rastreamento não encontrado');

          result.push({
            sucesso: true,
            rastreio,
            eventos: response.data.events.map((item) => {
              const evento: RastreioEvent = {
                status: item.status,
                data: item.data,
                hora: item.hora,
                local: item.local,
              };

              if (item.destino) {
                evento.local = item.origem.replace(/(.)+ - /g, '');
                evento.destino = item.destino;
                evento.origem = item.origem;
              }

              if (item.status.toLowerCase().includes('entregue'))
                entregue = true;

              return evento;
            }),
            responseTime,
            entregue,
            type,
          });
        }

        return;
      } catch (error) {
        const responseTime = new Date().getTime() - start;
        result.push({
          sucesso: false,
          rastreio,
          mensagem: error.message,
          responseTime,
        });
      }
    })
  );

  return result;
}
