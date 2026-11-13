
// IMPORTANDO O EXPRESS
import express from "express";
import type { Request, Response } from "express";

// IMPORTANDO O MODEL DO MONGOOSE
import Animal, { type InterfaceAnimal } from "./models/Animal.js";

const app = express();

// CONFIGURAÇÕES DO EXPRESS
app.use(express.json());
app.set("json spaces", 2);

// ==========================================
// GET - LISTAR TODOS OS ANIMAIS
// ==========================================

app.get("/animais", async (req: Request, res: Response) => {
  try {
    const listaAnimal = await Animal.find({});

    if (listaAnimal.length === 0) {
      return res.status(404).json({
        mensagem: "Nenhum animal encontrado."
      });
    }

    return res.status(200).json(listaAnimal);

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar relação de animais."
    });
  }
});

// ==========================================
// GET - BUSCAR UM ANIMAL PELO ID
// ==========================================

app.get("/animais/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    if (!Animal.db.base.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        mensagem: "ID do animal inválido."
      });
    }

    const animal = await Animal.findById(id);

    if (!animal) {
      return res.status(404).json({
        mensagem: "Animal não encontrado."
      });
    }

    return res.status(200).json(animal);

  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar animal."
    });
  }
});

// ==========================================
// POST - CADASTRAR UM NOVO ANIMAL
// ==========================================

app.post("/animais", async (req: Request<{}, {}, InterfaceAnimal>, res: Response) => {
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
      idAdotante
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
      idAdotante
    });

    return res.status(201).json({
      mensagem: "Animal cadastrado com sucesso!",
      animal: novoAnimal
    });

  } catch (error) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar animal. Verifique os dados enviados."
    });
  }
});

// ==========================================
// PUT - ATUALIZAR TODOS OS DADOS DO ANIMAL
// ==========================================

app.put("/animais/:id", async (req: Request<{ id: string }, {}, InterfaceAnimal>, res: Response) => {
    
  try{
    const { id } = req.params;

    const {nome, especie, raca, idade, porte, esquemaVacinal, status, idAbrigo, idAdotante} = req.body;

    const animalAtualizado = await Animal.findByIdAndUpdate(
      {
        nome,
        especie,
        raca,
        idade: Number(idade),
        porte,
        esquemaVacinal,
        status,
        idAbrigo,
        idAdotante
      },
      {new: true}
    );

    if(!animalAtualizado){
      res.status(404).json({mensagem: "Livro não encontrado!"});
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
});


// ==========================================
// PATCH - ATUALIZAR PARCIALMENTE UM ANIMAL
// ==========================================

app.patch("/animais/:id", async (req: Request<{ id: string },{}, InterfaceAnimal>, res: Response) => {
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
});
   

// ==========================================
// DELETE - REMOVER UM ANIMAL
// ==========================================

app.delete("/animais/:id", async (req: Request<{ id: string }>, res: Response) => {
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

    }catch(error){
      res.status(500).json({mensagem: "Erro ao remover o animal."});
    }
  );
    
export default app
  
  

// ==========================================
// EXPORTANDO O APP
// ==========================================

