import type {Request, Response} from "express";
import animal from "../models/Animal.js";
import Animal, { type InterfaceAnimal } from "../models/Animal.js";

class AnimalController{
        //GET - LISTAR TODOS OS ANIMAIS DO BANCO
        static async listar (req: Request, res: Response) {
        try{
    const listaAnimal = await Animal.find({});
    }catch(error) {
    return res.status(500).json({
        mensagem: "Erro ao buscar relação de animais."})

    }
        
}

//GET - BUSCAR UM ANIMAL ESPECIFICO PELO ID -REQ PARAMS

    static async buscarPorId (req: Request<{ id: string }>, res:Response){
    try{
        const { id } = req.params;
        const animalEncontrado = await Animal.findById(id);

        if(!animalEncontrado){
            res.status(404).json({mensagem: "Animal não encontrado."})
            return;
        }

        res.status(200).json(animalEncontrado);

    }catch (error){
        res.status(500).json({mensagem: "Erro ao buscar animal por ID."})
    }
}

        ///GET - FILTRAR ANIMAIS POR CRITÉRIOS OPCIONAIS -
    static async buscarPorFiltro (req:Request, res:Response){
        try{
            //Extrair os possíveis filtros enviados após o "?" na URL
            const{ raca, especie, porte, esquemaVacinal } = req.query;

            //Criar um objeto vazio para receber apenas os filtros preenchidos
            const filtro: Record<string, any> = {};

            if(raca){
                filtro.raca = String(raca); //Busca exata
            }

            if(especie){
                filtro.especie = String(especie); //Busca exata
            }

            if(porte){
                filtro.porte = { $regex: String(porte), $options:"i"}
            }
            //$regex: busca parcial (ex: "Machado", encontra "Machado de Assis...")

            if(esquemaVacinal){
                filtro.esquemaVacinal = { $regex: String(esquemaVacinal), $options:"i"}
            }

            const animaisFiltrados = await Animal.find(filtro);

            res.status(200).json(animaisFiltrados);

        }catch (error){
            res.status(500).json({mensagem:"Erro ao filtrar animais."})
        }
    }

    //POST - CADASTRAR UM NOVO LIVRO

            static async cadastrar (req: Request<{}, {}, InterfaceAnimal>, res: Response){

                try {
                
                
    const {
    nome,
    especie,
    raca,
    idade,
    porte,
    esquemaVacinal,
    status,
    idAbrigo,
    idAdotante,
    capa
    } = req.body;

    const novoAnimal = await Animal.create({
    nome,
    especie,
    raca,
    idade: Number(idade),
    porte,
    esquemaVacinal,
    status,
    idAbrigo,
    idAdotante,
    capa
    });

    return res.status(201).json({
    mensagem: "Animal cadastrado com sucesso!",
    animal: novoAnimal
    });

} catch (error) {
    return res.status(400).json({
    mensagem: "Erro ao cadastrar animal."
    });
}
            }


    //PUT - ATUALIZAR OS ANIMAIS

        static async atualizar (req: Request<{ id: string }, {}, InterfaceAnimal>, res: Response) {

            try{
    const { id } = req.params;

    const {nome, especie, raca, idade, porte, esquemaVacinal, status, idAbrigo, idAdotante, capa} = req.body;

    const animalAtualizado = await Animal.findByIdAndUpdate(
    id,
    {
        nome,
        especie,
        raca,
        idade: Number(idade),
        porte,
        esquemaVacinal,
        status,
        idAbrigo,
        idAdotante,
        capa
    },
    {new: true}
    );

    if(!animalAtualizado){
    res.status(404).json({mensagem: "Animal não encontrado!"});
    return;
    }

    res.status(208).json({
    mensagem: "Animal atualizado com sucesso!",
    animal: animalAtualizado
    });

}
catch (error) {
    res.status(400).json({
    mensagem: "Erro ao atualizar animal."
    });
}

        }

    //PATCH - ATUALIAZR PARCIALMENTE

        static async atualizarParcial (req: Request<{ id: string },{}, InterfaceAnimal>, res: Response) {

            try{
const {id} = req.params;

const animalAtualizado = await Animal.findByIdAndUpdate(
    id,
    {$set: req.body},
    { returnDocument: 'after'}
);

if(!animalAtualizado){
    res.status(404).json({mensagem: "animal não encontrado!"});
    return;
}
res.status(200).json({mensagem: "animal atualizado parcialmente com sucesso!",
    animal: animalAtualizado,
});
}catch(error){
    res.status(500).json({mensagem: "Erro ao atualizar parcialmente o animal."})
}
        }


    //DELETE - REMOVER UM ANIMAL
            static async deletar (req: Request<{ id: string }>, res: Response){

                const { id } = req.params;

                const animalDeletado = await Animal.findByIdAndDelete(id);

    if (!animalDeletado) {
    return res.status(404).json({
        mensagem: "animal não encontrado!"});
        return;
    }

    res.status(200).json({
        mensagem: "animal removido com sucesso!",
    });

    try {
      // Código para remover o animal
    } catch (error) {
    res.status(500).json({mensagem: "Erro ao remover o animal."});
        }
    }
};

export default AnimalController;