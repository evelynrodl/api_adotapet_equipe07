import express from "express";

const app = express();
app.use(express.json());

//cadastro de animais
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

//rota raiz GET
app.get("/", (req, res) => {
  res.status(200).send("API AdotaPet em Funcionamento");
});

//rota princ. GET ANIMAIS
app.get("/animais", (req, res) => {
  res.status(200).json(animais);
});

export default app;