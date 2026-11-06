//IMPORTANDO O EXPRESS PARA CRIAR O SERVIDOR
import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());

//PARTE DO CÓDIGO EM TYPESCRIPT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//REQUISICOES HTTP EM TYPESCRIPT (GET, POST, PUT, PATCH, DELETE) PARA CADASTRO DE ANIMAIS


// ARRAY para armazenar os animais em typeScript --simulação de um banco de dados
const Animais: Animal[] = [
  {
    id: 1,
    nome: "ADÃO",
    especie: "CANINA (CACHORRO)",
    raca: "GOLDEN RETRIEVER",
    idade: 8,
    porte: "Médio",
    esquemaVacinal: "Antirrábica, Gripe canina, Giárdia, Polivalente V8, Polivalente V10",
    status: "Animal adotado",
    idAbrigo: "ID 9102",
    idAdotante: "ID488"
  },


  {
    id: 2,
    nome: "AMORA",
    especie: "FELINA (GATA)",
    raca: "ANGORÁ TURCO",
    idade: 3,
    porte: "Pequeno",
    esquemaVacinal: "Antirrábica, Gripe felina, Polivalente V3, Polivalente V4, Polivalente V5, Vermifugação",
    status: "Animal adotado",
    idAbrigo: "ID 2569",
    idAdotante: "ID486"
  }
];


// DEFINIÇÃO DE UM TIPO DE DADO PARA O ANIMAL - POIS O TYPESCRIPT É UMA LINGUAGEM TIPADA, PRECISAMOS DEFINIR O TIPO DE DADO QUE VAI SER USADO NO ARRAY DE ANIMAIS
export interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  porte: string;
  esquemaVacinal: string;
  status: string;
  idAbrigo: string;
  idAdotante: string;
}

function buscaAnimal(id: string): number {
  return Animais.findIndex(animal => animal.id === parseInt(id));
}

// GET (ler) todos os animais em typeScript

app.get("/animais", (req: Request, res: Response) => {
  res.status(200).json(Animais);
});


// POST (cadastrar novo animal) em typeScript
app.post("/animais", (req: Request, res: Response) => {
  const novoAnimal: Animal = req.body;
  Animais.push(novoAnimal);
  res.status(201).json({
    mensagem: "Animal cadastrado com sucesso!",
    animal: novoAnimal
  });
});


// PUT (atualizar todos os dados) em typeScript
app.put("/animais/:id", (req: Request, res: Response) => {
  const index = buscaAnimal(String(req.params.id));

  if(index === -1) {
    res.status(404).json({ mensagem: "Animal não encontrado."});
    return;
  }

  const { nome, especie, raca, idade, porte, esquemaVacinal, status, idAbrigo, idAdotante } = req.body;

  animais[index] = {
    ...animais[index]!,
    nome,
    especie,
    raca,
     idade,
    porte,
    esquemaVacinal,
    status,
    idAbrigo,
    idAdotante
  };

  res.status(200).json({
    mensagem: "Animal atualizado com sucesso!",
    animal: animais[index]
  });
});

//DELETE (remover animal) em typeScript
app.delete("/animais/:id", (req: Request, res: Response) => {
  const index = buscaAnimal(String(req.params.id));

  if(index === -1) {
    res.status(404).json({ mensagem: "Animal não encontrado."});
    return;
  }

//REMOVE O ANIMAL DO ARRAY BASE (ANIMAIS) COM BASE NO ÍNDICE (ID)
  animais.splice(index, 1);

  res.status(200).json({
    mensagem: "Animal removido com sucesso."
  });
});


//Patch / diferente do PUT, que atualiza todos os dados, o PATCH atualiza apenas os dados que foram enviados no corpo da requisição / typeScript
app.patch("/animais/:id", (req: Request, res: Response) => {
  const index = buscaAnimal(String(req.params.id));

  if(index === -1) {
    res.status(404).json({ mensagem: "Animal não encontrado."});
    return;
  }

  const { nome, especie, raca, idade, porte, esquemaVacinal, status, idAbrigo, idAdotante } = req.body;

  if(nome !== undefined) animais[index]!.nome = nome;
  if(especie !== undefined) animais[index]!.especie = especie;
  if(raca !== undefined) animais[index]!.raca = raca;

  res.status(200).json({
    mensagem: "Animal atualizado com sucesso!",
    animal: animais[index]
  });
});


//middleware para habilitar o envio de dados em formato JSON


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// PARTE DO CÓDIGO EM JAVASCRIPT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//cadastro de animais - simulando um banco de dados (array de animais) em javascript
const animais = [
  {
    id: "ID 98253",
    nome: "ADÃO",
    especie: "CANINA (CACHORRO)",
    raca: "GOLDEN RETRIEVER",
    idade: "8 MESES",
    porte: "Médio",
    esquemaVacinal: "Antirrábica, Gripe canina, Giárdia, Polivalente V8, Polivalente V10",
    status: "Animal adotado",
    idAbrigo: "ID 9102",
    idAdotante: "ID488"
  },
  {
    id: "ID 457903",
    nome: "AMORA",
    especie: "FELINA (GATA)",
    raca: "ANGORÁ TURCO",
    idade: "3 MESES",
    porte: "Pequeno",
    esquemaVacinal: "Antirrábica, Gripe felina, Polivalente V3, Polivalente V4, Polivalente V5, Vermifugação",
    status: "Animal adotado",
    idAbrigo: "ID 2569",
    idAdotante: "ID486"
  },
];


//REQUISICOES HTTP EM JAVASCRIPT


// GET (ler) todos os animais JS
app.get("/animais", (req, res) => {
  res.status(200).send("API AdotaPet em Funcionamento");
  if (animais.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum animal encontrado" });
  }
});


// POST (cadastrar novo animal) JS
app.post("/animais", (req, res) => {
  const novoAnimal = req.body;
  animais.push(novoAnimal);


  res.status(201).json({
    mensagem: "Animal cadastrado com sucesso!",
    animal: novoAnimal
  });
});


// PUT (atualizar todos os dados) JS
app.put("/animais/:id", (req, res) => {
  const animal = animais.find(a => a.id === req.params.id);


  if (!animal) {
    return res.status(404).json({ mensagem: "Animal não encontrado" });
  }


  // Atualiza as propriedades do animal encontrado
  Object.assign(animal, req.body, { id: animal.id });


  res.status(200).json({
    mensagem: "Animal atualizado com sucesso!",
    animal: animal
  });
});


// PATCH (atualização parcial dos dados) JS
app.patch("/animais/:id", (req, res) => {
  const animal = animais.find(a => a.id === req.params.id);


  if (!animal) {
    return res.status(404).json({ mensagem: "Animal não encontrado" });
  }


  // Atualiza apenas os campos enviados no body, preservando o ID original
  Object.assign(animal, req.body, { id: animal.id });


  res.status(200).json({
    mensagem: "Animal atualizado parcialmente com sucesso!",
    animal: animal
  });
});


// DELETE (remover animal) JS
app.delete("/animais/:id", (req, res) => {
  const index = animais.findIndex(a => a.id === req.params.id);


  if (index === -1) {
    return res.status(404).json({ mensagem: "Animal não encontrado" });
  }


  const animalRemovido = animais.splice(index, 1);


  res.status(200).json({
    mensagem: "Animal removido com sucesso!",
    animal: animalRemovido[0]
  });
});


export default app;