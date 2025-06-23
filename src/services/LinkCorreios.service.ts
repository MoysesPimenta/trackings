import axios from 'axios';
import cheerio from 'cheerio';

interface RastreioEvent {
  status: string;
  data: string;
  hora: string;
  origem?: string;
  destino?: string;
  local?: string;
}

interface LinkCorreiosResponse {
  service: string;
  data: {
    events: RastreioEvent[];
  };
}

function formatStatus(str: string): string {
  const res = str
    .replace('Status', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

function formatDateTime(str: string): string[] {
  const res = str
    .split(' ')
    .join('')
    .replace(/\s\s+/g, ' ')
    .replace('Data:', '')
    .replace('Hora:', '')
    .split('|');

  const oldDate = res[0].split('/');
  const date = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`;

  return [date, res[1]];
}

function formatLocal(str: string): string {
  const res = str
    .replace('Local', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

function formatOrigin(str: string): string {
  const res = str
    .replace('Origem', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

function formatDestiny(str: string): string {
  const res = str
    .replace('Destino', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

function htmlToArray(response: string): RastreioEvent[] {
  const html = cheerio.load(response);
  const events: RastreioEvent[] = [];

  html('ul.linha_status').each((_, ulNode: any) => {
    const event: RastreioEvent = {
      status: '',
      data: '',
      hora: '',
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    html(ulNode)
      .find('li')
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .each((_, element) => {
        const text = html(element).text();
        if (text.includes('Status')) event.status = formatStatus(text);
        if (text.includes('Data')) {
          const [data, hour] = formatDateTime(text);
          event.data = data;
          event.hora = hour;
        }
        if (text.includes('Local')) event.local = formatLocal(text);
        if (text.includes('Origem')) event.origem = formatOrigin(text);
        if (text.includes('Destino')) event.destino = formatDestiny(text);
      });

    events.push(event);
  });
  events.shift();
  events.reverse();

  return events;
}

export async function LinkCorreiosService(
  rastreio: string
): Promise<LinkCorreiosResponse> {
  const { data } = await axios.get(
    `https://www.linkcorreios.com.br/?id=${rastreio}`
  );

  const response = htmlToArray(data);

  return { service: 'linkCorreios', data: { events: response } };
}
