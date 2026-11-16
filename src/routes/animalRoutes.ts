//IMPORTA O MÉTODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTA O CONTROLLER DE ANIMAIS
import AnimalController from "../controllers/animalControler.js";
import animal from "../models/Animal.js";

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//CRIAÇÃO DE ROTAS DA ENTIDADE ANIMAL

//GET

router.get("/animais", AnimalController.listar);

//POST

router.post("/animais", AnimalController.cadastrar);

//PUT

router.put("animais/:id", AnimalController.atualizar);

//PATCH

router.patch("/animais/:id", AnimalController.atualizarParcial);

//DELETE

router.delete("/animais/:id", AnimalController.deletar);

export default router;