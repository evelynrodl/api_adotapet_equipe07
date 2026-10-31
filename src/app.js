import express from "express";

const app = express();

//middleware para habilitar o envio de dados em formato JSON
app.use(express.json());

//cadastro de animais - simulando um banco de dados (array de animais) 
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
  {
    id: "ID 12018",
    nome: "BOB",
    especie: "CANINA (CACHORRO)",
    raca: "SHITZU",
    idade: "8 MESES",
    porte: "Pequeno",
    esquemaVacinal: "Antirrábica, Gripe canina, Giárdia, Polivalente V8, Polivalente V10",
    status: "Animal adotado",
    idAbrigo: "ID 4873",
    idAdotante: "ID493"
  },
  {
    id: "ID 2134",
    nome: "BOLT",
    especie: "CANINA (CACHORRO)",
    raca: "BORDER COLLIE",
    idade: "7 MESES",
    porte: "Médio",
    esquemaVacinal: "Antirrábica, Gripe canina, Giárdia, Polivalente V8, Polivalente V10",
    status: "Animal adotado",
    idAbrigo: "ID 0217",
    idAdotante: "ID492"
  },
  {
    id: "ID 1792",
    nome: "DUQUESA",
    especie: "CANINA (CADELA)",
    raca: "LULU DA POMERÂNIA",
    idade: "5 MESES",
    porte: "Pequeno",
    esquemaVacinal: "Antirrábica, Gripe canina, Polivalente V8, Polivalente V10, Giárdia",
    status: "Animal disponível para adoção",
    idAbrigo: "ID 9102",
    idAdotante: "ID481"
  },
  {
    id: "ID 01927",
    nome: "LUNA",
    especie: "FELINA (GATA)",
    raca: "MAINE COON",
    idade: "2 MESES",
    porte: "Pequeno",
    esquemaVacinal: "Gripe felina, Polivalente V3, Triplice Felina, Vermifugação",
    status: "Animal disponível para adoção",
    idAbrigo: "ID 2547",
    idAdotante: "ID494"
  },
  {
    id: "ID 298355",
    nome: "MAX",
    especie: "CANINA (CACHORRO)",
    raca: "BULDOGUE FRANCÊS",
    idade: "8 MESES",
    porte: "Médio",
    esquemaVacinal: "Antirrábica, Gripe canina, Giárdia, Polivalente V8, Polivalente V10",
    status: "Animal disponível para adoção",
    idAbrigo: "ID 2987",
    idAdotante: "ID482"
  },
  {
    id: "ID 10283",
    nome: "MEL",
    especie: "CANINA (CADELA)",
    raca: "GOLDEN RETRIEVER",
    idade: "9 MESES",
    porte: "Médio",
    esquemaVacinal: "Antirrábica, Gripe canina, Giárdia, Polivalente V8, Polivalente V10",
    status: "Animal disponível para adoção",
    idAbrigo: "ID 5019",
    idAdotante: "ID499"
  },
  {
    id: "ID 42739",
    nome: "TOBIAS",
    especie: "FELINA (GATO)",
    raca: "SIAMÊS",
    idade: "6 MESES",
    porte: "Pequeno",
    esquemaVacinal: "Antirrábica, Polivalente V3, Triplice Felina, Vermifugação, Gripe felina",
    status: "Animal em processo de adoção",
    idAbrigo: "ID 9102",
    idAdotante: "ID487"
  },
  {
    id: "ID 45370",
    nome: "ZARA",
    especie: "FELINA (GATA)",
    raca: "PERSA",
    idade: "12 MESES",
    porte: "Médio",
    esquemaVacinal: "Antirrábica, Polivalente V3, Polivalente V4, Polivalente V5, Gripe felina",
    status: "Animal disponível para adoção",
    idAbrigo: "ID 2569",
    idAdotante: "ID498"
  },
  {
    id: "ID 983527",
    nome: "ZECA",
    especie: "CANINA (CACHORRO)",
    raca: "VIRA-LATA/SRD",
    idade: "12 MESES",
    porte: "Grande",
    esquemaVacinal: "Antirrábica, Polivalente V10, Gripe canina, Giárdia, Polivalente V8",
    status: "Animal em processo de adoção",
    idAbrigo: "ID 2110",
    idAdotante: "ID490"
  }
];

// GET (ler) todos os animais
app.get("/", (req, res) => {
  res.status(200).send("API AdotaPet em Funcionamento");
});

app.get("/animais", (req, res) => {
  res.status(200).json(animais);
});

// GET POR ID (Usando .find)
app.get("/animais/:id", (req, res) => {
  const idBusca = req.params.id;
  const animal = animais.find(a => a.id === idBusca);

  if (!animal) {
    return res.status(404).json({ mensagem: "Animal não encontrado" });
  }

  res.status(200).json(animal);
});

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