import mongoose, {Schema, Document, type InferSchemaType} from "mongoose";

//interface alinhada com as propriedades usadas no app.ts
//
//export interface InterfaceAnimal extends Document {
//nome: string;
//especie: string;
//raca: string;
//idade: number;
//porte: string;
//esquemaVacinal: string;
//status: string;
//idAbrigo: string;
//idAdotante: string;
//}


//definiçao do schema mapeando os campos
 const animalSchema = new Schema (
   {
    nome: {type: String, required: true},
    especie: {type: String, required: true},
    raca: {type: String, required: true},
    idade: {type: Number, required: true},
    porte: {type: String, required: true},
    esquemaVacinal: {type: String, required: true},
    status: {type: String, required: true},
    idAbrigo: {type: String, required: true},
    idAdotante: {type: String, required: true}
   },
   { versionKey: false}
 );

 //Extraçao automatica do tipo (substituir a criaçao manual da interface)
 export type InterfaceAnimal = InferSchemaType<typeof animalSchema>;

 //Criaçao do model (moongose)
 const animal = mongoose.model("animal", animalSchema);

 //Disponibiliza o mosulo para ser importado em outros arquivos 
 export default animal;
