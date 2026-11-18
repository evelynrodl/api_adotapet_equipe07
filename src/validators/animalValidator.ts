import { z } from "zod";

//CRIAR AS REGRAS PARA CADASTRO  (POST) E ATUALIZAÇÃO (PUT)
export const criarAnimalValidator = z.object ({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    especie: z.string().min(3, "A especie deve ter pelo menos 3 caracteres."),
    idade: z.number().int(" A idade deve ser um número inteiro.").max(new Date().getFullYear()),
    porte: z.string().min(3, "O porte deve ter pelo menos 3 caracteres"),
    esquemaVacinal: z.string().min(3, "O esquemaVacinal deve ter pelo menos 3 caracteres"),
    capa: z
    .string()
    .url("A capa deve ser uma URL válida.")
    .optional()
    .or (z.literal(""))
    .transform((val) => (val === "" ? undefined:val)),
});


export const atualizarAnimalValidator = criarAnimalValidator.partial();

