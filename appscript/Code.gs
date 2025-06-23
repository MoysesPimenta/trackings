/**
 * Example Google Apps Script to fetch Correios tracking information using the
 * MelhorEnvio API. This script mimics part of the "rastreio-correios"
 * functionality and can be used inside Google Sheets.
 *
 * Usage inside a cell:
 *   =TRACK_CORREIOS("XX000000000BR")
 *   or =TRACK_CORREIOS(A1:A5)
 */

/**
 * Validate the tracking code format.
 */
function CODE_VALIDATOR(code) {
  return code && code.length === 13 && /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(code);
}

function getHora(date) {
  if (date.length === 24) {
    return date.slice(11, -8);
  }
  return date.replace(/(.)+ /, '').slice(0, -3);
}

function getDate(date) {
  if (date.length === 24) {
    return date.slice(0, -14);
  }
  return date.replace(/ (.)+/, '');
}

/**
 * Convert a MelhorEnvio tracking event to a simpler object.
 */
function formatEvents(events) {
  return events.map(function(item) {
    var ev = {
      status: item.events,
      data: getDate(item.date),
      hora: getHora(item.date),
      origem: item.local + ' - ' + (item.city || '') + ' / ' + (item.uf || ''),
      local: item.local + ' - ' + (item.city || '') + ' / ' + (item.uf || '')
    };
    if (item.destination_local) {
      ev.destino = item.destination_local + ' - ' +
        (item.destination_city || '') + ' / ' + (item.destination_uf || '');
    }
    if (item.comment) ev.comentario = item.comment;
    return ev;
  });
}

/**
 * Fetch tracking data for a single code using MelhorEnvio API.
 */
function fetchMelhorEnvio(code) {
  var url = 'https://api.melhorrastreio.com.br/api/v1/trackings/' + code;
  var response = UrlFetchApp.fetch(url, { 'muteHttpExceptions': true });
  if (response.getResponseCode() !== 200) throw new Error('Erro ao consultar API');
  var data = JSON.parse(response.getContentText());
  if (!data.success) throw new Error('Rastreamento não encontrado');
  return data;
}

/**
 * Main function callable from a Spreadsheet.
 * Returns an array of tracking results.
 */
function TRACK_CORREIOS(codes) {
  if (!codes) throw new Error('Códigos de rastreio não foram informados');
  if (!Array.isArray(codes)) codes = [codes];

  var results = [];
  for (var i = 0; i < codes.length; i++) {
    var code = codes[i];
    var start = new Date().getTime();
    var item = { sucesso: false, rastreio: code, responseTime: 0 };

    if (!CODE_VALIDATOR(code)) {
      item.mensagem = 'Código de rastreio inválido';
      results.push(item);
      continue;
    }

    try {
      var data = fetchMelhorEnvio(code);
      var eventos = formatEvents(data.data.events);
      var entregue = eventos.some(function(ev) {
        return ev.status.toLowerCase().indexOf('entregue') !== -1;
      });
      item.sucesso = true;
      item.eventos = eventos;
      item.entregue = entregue;
    } catch (e) {
      item.mensagem = e.message;
    }

    item.responseTime = new Date().getTime() - start;
    results.push(item);
  }

  return results;
}
