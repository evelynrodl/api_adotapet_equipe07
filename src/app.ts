
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


// ==========================================!!!
// POST - CADASTRAR UM NOVO ANIMAL
// ==========================================


// ==========================================!!!
// PUT - ATUALIZAR TODOS OS DADOS DO ANIMAL
// ==========================================




// ==========================================!!!
// PATCH - ATUALIZAR PARCIALMENTE UM ANIMAL
// ==========================================



// ==========================================!!!
// DELETE - REMOVER UM ANIMAL
// ==========================================


// ==========================================!!!
//EXPORTANDO O APP PARA SER USADO EM OUTROS ARQUIVOS
// ==========================================
export default app