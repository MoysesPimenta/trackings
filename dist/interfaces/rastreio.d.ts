export interface RastreioResult {
    sucesso: boolean;
    rastreio: string;
    responseTime: number;
    mensagem?: string;
    entregue?: boolean;
    eventos?: RastreioEvent[];
    type?: string;
}
export interface RastreioEvent {
    status: string;
    data: string;
    hora: string;
    origem?: string;
    destino?: string;
    local?: string;
}
