export declare function MelhorEnvioService(rastreio: string): Promise<{
    service: string;
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
            destination_local?: string | undefined;
            destination_city?: string | undefined;
            destination_uf?: string | undefined;
            comment?: string | undefined;
        }[];
    };
}>;
