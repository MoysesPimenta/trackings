import { RastreioResult } from '../interfaces/rastreio';
/**
 * Rastreia um ou mais códigos de rastreio
 * @param {string} Códigos
 * @returns {promise}
 */
export declare function Tracking(rastreios: string | string[]): Promise<RastreioResult[]>;
