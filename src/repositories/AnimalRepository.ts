export interface AnimalDTO{
    id?: string;
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    porte: string;
    esquemaVacinal: string;
    status: string;
    idAbrigo: string;
    idAdotante: string;
    capa?: string | undefined;
}

export interface FiltroAnimalDTO{
    raca?: string;
    especie?: string;
    porte?: string;
    esquemaVacinal?: string;
}

export interface AnimalRepository{
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any[] | null>;
    buscarPorFiltro(filtros: FiltroAnimalDTO): Promise<any[]>;
    cadastrar(dados: AnimalDTO): Promise<any[]>;
    atualizar(id: string, dados: AnimalDTO): Promise<any[]>;
    atualizarParcial(id: string, dados:Partial<AnimalDTO>): Promise<any[] | null>;
    deletar(id: string): Promise<boolean>;

}