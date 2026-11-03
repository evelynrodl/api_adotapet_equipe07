import express from "express";
import type { Request, Response } from "express";

// TypeScript interface para Animal
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

const app = express();

//middleware para habilitar o envio de dados em formato JSON
app.use(express.json());

//REQUISICOES HTTP EM TYPESCRIPT
// Array para armazenar os animais em typeScript --simulação de um banco de dados
const animais: Animal[] = [
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

//cadatro por meio de requisição POST em typeScript
const novoAnimal: Animal = {
  id: number(id),
  nome,
  especie,
  raca,
  idade: number(idade),
  porte,
  esquemaVacinal,
  status: String,
  idAbrigo,
  idAdotante,
};

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

//funcoes
function gerarId() {id: string | number {
  return Math.floor(Math.random() * 1000000); // VAI GERAR UM ID ALEATORIO PARA CADA ANIMAL
}

//REQUISICOES HTTP EM JAVASCRIPT
// GET (ler) todos os animais em typeScript
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("API AdotaPet em Funcionamento");
});

app.get("/animais", (req: Request, res: Response) => {
  res.status(200).json(animais);
});

// GET POR ID (Usando .find) em typeScript
app.get("/animais/:id", (req: Request, res: Response) => {
  const animal = animais.find(a => a.id === req.params.id);

// POST (cadastrar novo animal)
app.post("/animais", (req, res) => {
  const novoAnimal = req.body;
  animais.push(novoAnimal);

  res.status(201).json({
    mensagem: "Animal cadastrado com sucesso!",
    animal: novoAnimal
  });
});

// PUT (atualizar todos os dados)
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

// PATCH (atualização parcial dos dados)
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

// DELETE (remover animal)
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