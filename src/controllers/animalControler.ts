import type { Request, Response } from "express";
import Animal, { type InterfaceAnimal } from "../models/Animal.js";
import type {AnimalRepository, AnimalDTO, FiltroAnimalDTO} from "../repositories/AnimalRepository.js"

class AnimalController {

    private AnimalRepository: AnimalRepository;

    constructor(AnimalRepository: AnimalRepository){
        this.AnimalRepository = AnimalRepository;
    }

    // GET - LISTAR TODOS OS ANIMAIS
     async listar(req: Request, res: Response) {
        try {
        const listaAnimal = await this.AnimalRepository.listar();
           
            res.status(200).json(listaAnimal);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar relação de animais."
            });
        }
    }


    // GET - BUSCAR UM ANIMAL PELO ID
    async buscarPorId(
        req: Request<{ id: string }>,
        res: Response
    ) {
        try {
            const { id } = req.params;
            const AnimalEncontrado = await this.AnimalRepository.buscarPorId(id);

            // Verificar se o ID possui formato válido
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({
                    mensagem: "ID do animal inválido."
                });
            }

            if (!AnimalEncontrado) {
                return res.status(404).json({
                    mensagem: "Animal não encontrado."
                });
            }

            return res.status(200).json(AnimalEncontrado);

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
     async cadastrar(
        req: Request<{}, {}, InterfaceAnimal>,
        res: Response
    ) {
        try {
            const novoAnimal = await this.AnimalRepository.cadastrar(req.body);

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
     async atualizar(
        req: Request<{ id: string }, {}, InterfaceAnimal>,
        res: Response
    ) {
        try {
            const { id } = req.params;

            const AnimalAtualizado = await this.AnimalRepository.atualizar(id, req.body);
        
            if (!AnimalAtualizado) {
                return res.status(404).json({
                    mensagem: "Animal não encontrado!"
                });
            }

            return res.status(200).json({
                mensagem: "Animal atualizado com sucesso!",
                animal: AnimalAtualizado
            });

        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar animal."
            });
        }
    }


    // PATCH - ATUALIZAR UM ANIMAL PARCIALMENTE
    async atualizarParcial(
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

            
            const animalAtualizado = await this.AnimalRepository.atualizarParcial(id, req.body)
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
     async deletar(
        req: Request<{ id: string }>,
        res: Response
    ) {
        try {
            const { id } = req.params;

            const AnimalDeletado = await this.AnimalRepository.deletar(id);

            if (!AnimalDeletado) {
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
