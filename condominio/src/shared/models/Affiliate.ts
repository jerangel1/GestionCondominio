export interface Affiliate {
    distribuitorInfo: {
        distribuitorName: string;
        name: string;
        asociado_id: string;
        contact: string;
        parentId: string;
        email: string;
        phone: string;
        mobile: string;
        address: string;
        maxima_longitud_permuta: string;
       
        estatus: boolean,
        monitorapuestas:boolean,
        gestionarhijos:boolean,
    };
    quotas?: {
        triples?: number;
        terminals?: number;
        signedTriples?: number;
        signedTerminal?: number;
        littleAnimals?: number;
    }[];
    commissions?: {
        triplesCommissions?: number;
        terminalsCommissions?: number;
        signedTriplesCommissions?: number;
        signedTerminalCommissions?: number;
        littleAnimalsCommissions?: number;
    }[];
}