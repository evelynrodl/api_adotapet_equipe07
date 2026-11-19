import type { Request, Response } from "express";
import Animal, { type InterfaceAnimal } from "../models/Animal.js";

class AnimalController {

    // GET - LISTAR TODOS OS ANIMAIS
    static async listar(req: Request, res: Response) {
        try {
            const listaAnimal = await Animal.find({});

            return res.status(200).json(listaAnimal);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar relação de animais."
            });
        }
    }


    // GET - BUSCAR UM ANIMAL PELO ID
    static async buscarPorId(
        req: Request<{ id: string }>,
        res: Response
    ) {
        try {
            const { id } = req.params;

            // Verificar se o ID possui formato válido
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({
                    mensagem: "ID do animal inválido."
                });
            }

            const animalEncontrado = await Animal.findById(id);

            if (!animalEncontrado) {
                return res.status(404).json({
                    mensagem: "Animal não encontrado."
                });
            }

            return res.status(200).json(animalEncontrado);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar animal por ID."
            });
        }
    }


    // GET - FILTRAR ANIMAIS POR CRITÉRIOS OPCIONAIS
    static async buscarPorFiltro(req: Request, res: Response) {
        try {
            const {
                raca,
                especie,
                porte,
                esquemaVacinal
            } = req.query;

            const filtro: Record<string, any> = {};

            if (raca) {
                filtro.raca = String(raca);
            }

            if (especie) {
                filtro.especie = String(especie);
            }

            if (porte) {
                filtro.porte = {
                    $regex: String(porte),
                    $options: "i"
                };
            }

            if (esquemaVacinal) {
                filtro.esquemaVacinal = {
                    $regex: String(esquemaVacinal),
                    $options: "i"
                };
            }

            const animaisFiltrados = await Animal.find(filtro);

            return res.status(200).json(animaisFiltrados);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao filtrar animais."
            });
        }
    }


    // POST - CADASTRAR UM NOVO ANIMAL
    static async cadastrar(
        req: Request<{}, {}, InterfaceAnimal>,
        res: Response
    ) {
        try {
            const {
                nome,
                especie,
                raca,
                idade,
                porte,
                esquemaVacinal,
                status,
                idAbrigo,
                idAdotante,
                capa
            } = req.body;

            const novoAnimal = await Animal.create({
                nome,
                especie,
                raca,
                idade: Number(idade),
                porte,
                esquemaVacinal,
                status,
                idAbrigo,
                idAdotante,
                capa
            });

            return res.status(201).json({
                mensagem: "Animal cadastrado com sucesso!",
                animal: novoAnimal
            });

        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao cadastrar animal."
            });
        }
    }


    // PUT - ATUALIZAR UM ANIMAL COMPLETAMENTE
    static async atualizar(
        req: Request<{ id: string }, {}, InterfaceAnimal>,
        res: Response
    ) {
        try {
            const { id } = req.params;

            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({
                    mensagem: "ID do animal inválido."
                });
            }

            const {
                nome,
                especie,
                raca,
                idade,
                porte,
                esquemaVacinal,
                status,
                idAbrigo,
                idAdotante,
                capa
            } = req.body;

            const animalAtualizado = await Animal.findByIdAndUpdate(
                id,
                {
                    nome,
                    especie,
                    raca,
                    idade: Number(idade),
                    porte,
                    esquemaVacinal,
                    status,
                    idAbrigo,
                    idAdotante,
                    capa
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!animalAtualizado) {
                return res.status(404).json({
                    mensagem: "Animal não encontrado!"
                });
            }

            return res.status(200).json({
                mensagem: "Animal atualizado com sucesso!",
                animal: animalAtualizado
            });

        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar animal."
            });
        }
    }


    // PATCH - ATUALIZAR UM ANIMAL PARCIALMENTE
    static async atualizarParcial(
        req: Request<{ id: string }>,
        res: Response
    ) {
        try {
            const { id } = req.params;

            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({
                    mensagem: "ID do animal inválido."
                });
            }

            const animalAtualizado = await Animal.findByIdAndUpdate(
                id,
                { $set: req.body },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!animalAtualizado) {
                return res.status(404).json({
                    mensagem: "Animal não encontrado!"
                });
            }

            return res.status(200).json({
                mensagem: "Animal atualizado parcialmente com sucesso!",
                animal: animalAtualizado
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar parcialmente o animal."
            });
        }
    }


    // DELETE - REMOVER UM ANIMAL
    static async deletar(
        req: Request<{ id: string }>,
        res: Response
    ) {
        try {
            const { id } = req.params;

            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({
                    mensagem: "ID do animal inválido."
                });
            }

            const animalDeletado = await Animal.findByIdAndDelete(id);

            if (!animalDeletado) {
                return res.status(404).json({
                    mensagem: "Animal não encontrado!"
                });
            }

            return res.status(200).json({
                mensagem: "Animal removido com sucesso!"
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao remover o animal."
            });
        }
    }

}

export default AnimalController;
