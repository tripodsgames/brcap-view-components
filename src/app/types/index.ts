export class MetadadosXLS {
    chave: string;
    nome: string;
    grupo?: string;
    formato?: string;
};

export class MetadadosDetalhe {
    chave: string;
    detalhes: Array<{
        chave: string,
        nome: string,
        tamanho: number,
    }>;
};

export class DadosPlanilha {
    linhas: Array<object>;
    metadadosTabela: Array<MetadadosXLS>;
    titulo: string;
    metadadosDetalhe?: MetadadosDetalhe;
};