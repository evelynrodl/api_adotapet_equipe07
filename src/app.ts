// IMPORTANDO O EXPRESS
import express from "express";
import type { Request, Response } from "express";
import animalRoutes from "./routes/animalRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";


const app = express();

// MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

//ROTA DA DOCUMENTAÇÃO INTERATIVA (SWAGGER)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//ROTA BASE
app.get("/", (req: Request, res: Response) => {
});


//REGISTRAR AS ROTAS DE "ANIMAIS" NA APLICAÇÃO
app.use(animalRoutes);


export default app;