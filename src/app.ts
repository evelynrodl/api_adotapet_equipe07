
// IMPORTANDO O EXPRESS
import express from "express";
import type { Request, Response } from "express";
import animalRoutes from "./routes/animalRoutes.js"

const app = express();

// MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);


//ROTA BASE
app.get("/animais", (req: Request, res: Response) => {
});


//REGISTRAR AS ROTAS DE "ANIMAIS" NA APLICAÇÃO
app.use(animalRoutes);


export default app;