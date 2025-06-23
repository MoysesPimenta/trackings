"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkCorreiosService = void 0;
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
function formatStatus(str) {
    var res = str
        .replace('Status', '')
        .replace(/\s\s+/g, ' ')
        .replace(':', '')
        .trim();
    return res;
}
function formatDateTime(str) {
    var res = str
        .split(' ')
        .join('')
        .replace(/\s\s+/g, ' ')
        .replace('Data:', '')
        .replace('Hora:', '')
        .split('|');
    var oldDate = res[0].split('/');
    var date = "".concat(oldDate[2], "-").concat(oldDate[1], "-").concat(oldDate[0]);
    return [date, res[1]];
}
function formatLocal(str) {
    var res = str
        .replace('Local', '')
        .replace(/\s\s+/g, ' ')
        .replace(':', '')
        .trim();
    return res;
}
function formatOrigin(str) {
    var res = str
        .replace('Origem', '')
        .replace(/\s\s+/g, ' ')
        .replace(':', '')
        .trim();
    return res;
}
function formatDestiny(str) {
    var res = str
        .replace('Destino', '')
        .replace(/\s\s+/g, ' ')
        .replace(':', '')
        .trim();
    return res;
}
function htmlToArray(response) {
    var html = cheerio_1.default.load(response);
    var events = [];
    html('ul.linha_status').each(function (_, ulNode) {
        var event = {
            status: '',
            data: '',
            hora: '',
        };
        // eslint-disable-next-line @typescript-eslint/no-shadow
        html(ulNode)
            .find('li')
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .each(function (_, element) {
            var text = html(element).text();
            if (text.includes('Status'))
                event.status = formatStatus(text);
            if (text.includes('Data')) {
                var _a = formatDateTime(text), data = _a[0], hour = _a[1];
                event.data = data;
                event.hora = hour;
            }
            if (text.includes('Local'))
                event.local = formatLocal(text);
            if (text.includes('Origem'))
                event.origem = formatOrigin(text);
            if (text.includes('Destino'))
                event.destino = formatDestiny(text);
        });
        events.push(event);
    });
    events.shift();
    events.reverse();
    return events;
}
function LinkCorreiosService(rastreio) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("https://www.linkcorreios.com.br/?id=".concat(rastreio))];
                case 1:
                    data = (_a.sent()).data;
                    response = htmlToArray(data);
                    return [2 /*return*/, { service: 'linkCorreios', data: { events: response } }];
            }
        });
    });
}
exports.LinkCorreiosService = LinkCorreiosService;
//# sourceMappingURL=LinkCorreios.service.js.map