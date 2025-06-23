"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
function getHora(date) {
    if (date.length === 24) {
        // is ISO
        return date.slice(11, -8);
    }
    return date.replace(/(.)+ /g, '').slice(0, -3);
}
function getDate(date) {
    if (date.length === 24) {
        // is ISO
        return date.slice(0, -14);
    }
    return date.replace(/ (.)+/g, '');
}
function getEvents(response, tag) {
    var filteredEvents = response.data[tag].filter(function (item) { return item.tag !== 'added'; });
    return filteredEvents.map(function (item) {
        var evento = {
            status: item.events,
            data: getDate(item.date),
            hora: getHora(item.date),
            origem: "".concat(item.local, " - ").concat(item.city || '', " / ").concat(item.uf || ''),
            local: "".concat(item.local, " - ").concat(item.city || '', " / ").concat(item.uf || ''),
        };
        if (item.destination_local) {
            evento.destino = "".concat(item.destination_local || '', " - ").concat(item.destination_city || '', " / ").concat(item.destination_uf || '');
        }
        return evento;
    });
}
exports.getEvents = getEvents;
//# sourceMappingURL=getEvents.js.map