//IMPORTA O MÉTODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

///IMPORTA O CONTROLLER DE ANIMAIS
import AnimalController from "../controllers/animalControler.js";


//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//1º - ROTAS FIXAS E DE BUSCA
router.get("/animais", AnimalController.listar);
router.get("/animais/busca", AnimalController.buscarPorFiltro)

//2º - ROTAS DE BUSCA COM PARÂMETRO DINÂMICO
router.get("/animais/:id", AnimalController.buscarPorId);

//3º  - ROTAS DE ESCRITA E REMOÇÃO (ESTÁTICAS E DINÂMICAS)
router.post("/animais", AnimalController.cadastrar);
router.put("animais/:id", AnimalController.atualizar)
router.patch("/animais/:id", AnimalController.atualizarParcial)
router.delete("/animais/:id", AnimalController.deletar);

//EXPORTA AS ROTAS CONFIGURADAS PARA SEREM USADAS NO APP.TS
export default router;