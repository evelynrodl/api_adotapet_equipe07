import mongoose, {Schema, Document} from "mongoose";

//interface alinhada com as propriedades usadas no app.ts
export interface InterfaceAnimal extends Document {
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

//definiçao do schema mapeando os campos
