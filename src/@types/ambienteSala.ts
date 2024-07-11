

export interface IAmbienteData{
    _id: string;
    manutencaoPredios: IManutencaoPredios;
    manutencaoPisos: IManutencaoPisos;
    manutencaoLocal: IManutencaoLocal;
    manutencaoItem: IManutencaoItem[]
} // Dados retornados pelo endpoint https://proxy-intra.feagri.unicamp.br:8085/zeladoria/manutencao/item/show/[Item Id]

export interface IAmbienteSalaComponentProps {
    isLoading: boolean;
    ambienteData: IAmbienteData;
    detalhesItensData: IDetalhesItemData[];
}

export interface IDetalhesItemData{
    _id: string;
    descricao: string;
    manutencaoProblemas: IManutencaoProblema[];
    manutencaoCategorias: IManutencaoCategorias;
} // -> Tipagem para os detalhes de cada item

interface IManutencaoPredios{
    id_predios: string;
    descricao_predios: string;
}

interface IManutencaoPisos{
    id_pisos: string;
    descricao_pisos: string;
}

interface IManutencaoLocal{
    id_local: string;
    descricao_local: string;
}

export interface IManutencaoItem{
    _id: string;
    descricao_item: string;
    quantidade: number;
}


interface IManutencaoProblema{
    _id: string;
    descricao_problemas: string;
}

interface IManutencaoCategorias{
    id_categoria: string;
    descricao_categorias: string;
}

