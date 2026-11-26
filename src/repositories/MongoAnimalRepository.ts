import Animal from "../models/Animal.js";
import type { AnimalRepository, AnimalDTO, FiltroAnimalDTO } from "../repositories/AnimalRepository.js";


export class MongoAnimalRepository implements AnimalRepository{
     async listar(): Promise<any>{
        return await Animal.find({});
        
    }

     async buscarPorId(id: string): Promise<any>{
      return await Animal.findById(id);
    }

    async buscarPorFiltro(filtros: FiltroAnimalDTO): Promise<any>{
         const filtro: Record<string, any> = {};

        if (filtros.raca) filtro.raca = filtros.raca;
        if (filtros.especie) filtro.especie = filtros.especie;
        if (filtros.porte) filtro.porte = { $regex: filtros.porte, $options: "i"};
        if (filtros.esquemaVacinal) filtro.esquemaVacinal = { $regex: filtros.esquemaVacinal, $options: "i"};

         return await Animal.find(filtro);
    }
 
    async cadastrar (dados: AnimalDTO){
        return await Animal.create({
        nome: dados.nome,
        especie: dados.especie,
        raca: dados.raca,
        idade: Number(dados.idade),
        porte: dados.porte,
        esquemaVacinal: dados.esquemaVacinal,
        status: dados.status,
        idAbrigo: dados.idAbrigo,
        idAdotante: dados.idAdotante,
        ...(dados.capa !== undefined ? {capa: dados.capa}: {}),
    });
    }

    async atualizar (id: string, dados: AnimalDTO){
        return await Animal.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
        
    }

    async atualizarParcial(id: string, dados: Partial<AnimalDTO>){
        return await Animal.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        )
    }

    async deletar (id: string){
        const AnimalDeletado = await Animal.findByIdAndDelete(id);
        return Boolean(AnimalDeletado);
    }

}
