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
export declare function LinkCorreiosService(rastreio: string): Promise<LinkCorreiosResponse>;
export {};
