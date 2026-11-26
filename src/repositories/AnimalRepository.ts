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
    listar(): Promise<AnimalDTO[]>;
    buscarPorId(id: string): Promise<AnimalDTO[] | null>;
    buscarPorFiltro(filtros: FiltroAnimalDTO): Promise<AnimalDTO[]>;
    cadastrar(dados: AnimalDTO): Promise<AnimalDTO>;
    atualizar(id: string, dados: AnimalDTO): Promise<AnimalDTO | null>;
    atualizarParcial(id: string, dados:Partial<AnimalDTO>): Promise<AnimalDTO | null>;
    deletar(id: string): Promise<boolean>;

}

