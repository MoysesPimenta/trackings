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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracking = void 0;
var Any = require("promise.any");
var LinkCorreios_service_1 = require("../services/LinkCorreios.service");
var MelhorEnvio_service_1 = require("../services/MelhorEnvio.service");
var codeValidator_1 = require("../utils/codeValidator");
var getEvents_1 = require("../utils/getEvents");
var siglasDatabase_1 = require("../utils/siglasDatabase");
/**
 * Rastreia um ou mais códigos de rastreio
 * @param {string} Códigos
 * @returns {promise}
 */
function Tracking(rastreios) {
    return __awaiter(this, void 0, void 0, function () {
        var lista, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!rastreios)
                        throw new Error('Códigos de rastreio não foram informados');
                    lista = [];
                    if (typeof rastreios === 'string') {
                        lista.push(rastreios);
                    }
                    else {
                        lista = __spreadArray([], rastreios, true);
                    }
                    result = [];
                    return [4 /*yield*/, Promise.all(lista.map(function (rastreio) { return __awaiter(_this, void 0, void 0, function () {
                            var start, response, responseTime, entregue_1, type, eventos, error_1, responseTime;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        start = new Date().getTime();
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        if (!(0, codeValidator_1.codeValidator)(rastreio))
                                            throw new Error('Código de rastreio inválido');
                                        return [4 /*yield*/, Any([
                                                (0, MelhorEnvio_service_1.MelhorEnvioService)(rastreio),
                                                (0, LinkCorreios_service_1.LinkCorreiosService)(rastreio),
                                            ])];
                                    case 2:
                                        response = _a.sent();
                                        responseTime = new Date().getTime() - start;
                                        entregue_1 = false;
                                        type = siglasDatabase_1.siglas[rastreio.slice(0, 2)] || 'Não identificado';
                                        if (response.service === 'melhorEnvio') {
                                            eventos = response.data.events
                                                ? (0, getEvents_1.getEvents)(response, 'events')
                                                : (0, getEvents_1.getEvents)(response, 'event');
                                            eventos.forEach(function (item) {
                                                if (item.status.toLowerCase().includes('entregue'))
                                                    entregue_1 = true;
                                            });
                                            result.push({
                                                sucesso: true,
                                                rastreio: rastreio,
                                                eventos: eventos,
                                                responseTime: responseTime,
                                                entregue: entregue_1,
                                                type: type,
                                            });
                                        }
                                        else {
                                            if (response.data.events.length === 0)
                                                throw new Error('Rastreamento não encontrado');
                                            result.push({
                                                sucesso: true,
                                                rastreio: rastreio,
                                                eventos: response.data.events.map(function (item) {
                                                    var evento = {
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
                                                        entregue_1 = true;
                                                    return evento;
                                                }),
                                                responseTime: responseTime,
                                                entregue: entregue_1,
                                                type: type,
                                            });
                                        }
                                        return [2 /*return*/];
                                    case 3:
                                        error_1 = _a.sent();
                                        responseTime = new Date().getTime() - start;
                                        result.push({
                                            sucesso: false,
                                            rastreio: rastreio,
                                            mensagem: error_1.message,
                                            responseTime: responseTime,
                                        });
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.Tracking = Tracking;
//# sourceMappingURL=tracking.js.map