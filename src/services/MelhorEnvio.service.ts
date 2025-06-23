import axios from 'axios';

interface MelhorEnvio {
  success: boolean;
  data: {
    service_name: string;
    status: string;
    events: {
      events: string;
      tag: string;
      local: string;
      date: string;
      city: string;
      uf: string;
      destination_local?: string;
      destination_city?: string;
      destination_uf?: string;
      comment?: string;
    }[];
  };
  service: string;
}

export async function MelhorEnvioService(rastreio: string) {
  const { data } = await axios.get<MelhorEnvio>(
    `https://api.melhorrastreio.com.br/api/v1/trackings/${rastreio}`
  );

  if (!data.success) throw new Error('Rastreamento não encontrado');

  return { ...data, service: 'melhorEnvio' };
}
