import Animal from "../models/Animal.js";
import type { AnimalRepository, AnimalDTO, FiltroAnimalDTO, cadastrar } from "./AnimalRepository.js";

export class MongoAnimalRepository implements AnimalRepository{
    static async listar(){
        return await Animal.find({});
        
    }

    static async buscarPorId(id: string){
      return await Animal.findById(id);
    }

    static async buscarPorFiltro(filtros: FiltroAnimalDTO){
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

    async deletar (id: string){
        const AnimalDeletado = await Animal.findByIdAndDelete(id);
        return Boolean(AnimalDeletado);
    }

}
