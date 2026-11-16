
// IMPORTANDO O EXPRESS
import express from "express";
import type { Request, Response } from "express";

// IMPORTANDO O MODEL DO MONGOOSE
import Animal, { type InterfaceAnimal } from "./models/Animal.js";

const app = express();

// CONFIGURAÇÕES DO EXPRESS
app.use(express.json());
app.set("json spaces", 2);

// ==========================================!!!!
// GET - LISTAR TODOS OS ANIMAIS
// ==========================================

app.get("/animais", async (req: Request, res: Response) => {
  
});

// ==========================================!!!
// GET - BUSCAR UM ANIMAL PELO ID
// ==========================================

app.get("/animais/:id", async (req: Request<{ id: string }>, res: Response) => {
  
});

// ==========================================!!!
// POST - CADASTRAR UM NOVO ANIMAL
// ==========================================

app.post("/animais", async (req: Request<{}, {}, InterfaceAnimal>, res: Response) => {
  
});

// ==========================================!!!
// PUT - ATUALIZAR TODOS OS DADOS DO ANIMAL
// ==========================================

app.put("/animais/:id", async (req: Request<{ id: string }, {}, InterfaceAnimal>, res: Response) => {
    
  
});


// ==========================================!!!
// PATCH - ATUALIZAR PARCIALMENTE UM ANIMAL
// ==========================================

app.patch("/animais/:id", async (req: Request<{ id: string },{}, InterfaceAnimal>, res: Response) => {
  
});
  

// ==========================================!!!
// DELETE - REMOVER UM ANIMAL
// ==========================================

app.delete("/animais/:id", async (req: Request<{ id: string }>, res: Response) => {
  

});

// ==========================================!!!
//EXPORTANDO O APP PARA SER USADO EM OUTROS ARQUIVOS
// ==========================================
export default app