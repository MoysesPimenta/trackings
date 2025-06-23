import { RastreioEvent } from '../interfaces/rastreio';

function getHora(date: string) {
  if (date.length === 24) {
    // is ISO
    return date.slice(11, -8);
  }
  return date.replace(/(.)+ /g, '').slice(0, -3);
}

function getDate(date: string) {
  if (date.length === 24) {
    // is ISO
    return date.slice(0, -14);
  }
  return date.replace(/ (.)+/g, '');
}

export function getEvents(response, tag) {
  const filteredEvents = response.data[tag].filter(
    (item) => item.tag !== 'added'
  );

  return filteredEvents.map((item) => {
    const evento: RastreioEvent = {
      status: item.events,
      data: getDate(item.date),
      hora: getHora(item.date),
      origem: `${item.local} - ${item.city || ''} / ${item.uf || ''}`,
      local: `${item.local} - ${item.city || ''} / ${item.uf || ''}`,
    };

    if (item.destination_local) {
      evento.destino = `${item.destination_local || ''} - ${
        item.destination_city || ''
      } / ${item.destination_uf || ''}`;
    }

    return evento;
  });
}
