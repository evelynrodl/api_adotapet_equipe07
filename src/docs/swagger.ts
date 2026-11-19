export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestão de Animais",
    version: "1.0.0",
    description: "Documentação da API REST para gerenciamento de cadastro, busca, atualização e remoção de animais.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de Desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Animais",
      description: "Operações relacionadas ao gerenciamento de animais",
    },
  ],
  components: {
    schemas: {
      Animal: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "65f1a2b3c4d5e6f7a8b9c0d1",
          },
          nome: {
            type: "string",
            minLength: 3,
            example: "Rex",
          },
          especie: {
            type: "string",
            minLength: 3,
            example: "Cachorro",
          },
          raca: {
            type: "string",
            example: "Labrador",
          },
          idade: {
            type: "integer",
            maximum: new Date().getFullYear(),
            example: 3,
          },
          porte: {
            type: "string",
            minLength: 3,
            example: "Grande",
          },
          esquemaVacinal: {
            type: "string",
            minLength: 3,
            example: "Completo",
          },
          status: {
            type: "string",
            example: "Disponível",
          },
          idAbrigo: {
            type: "string",
            example: "65f1a2b3c4d5e6f7a8b9c0d2",
          },
          idAdotante: {
            type: "string",
            nullable: true,
            example: null,
          },
          capa: {
            type: "string",
            format: "uri",
            example: "https://exemplo.com/imagens/rex.jpg",
          },
        },
      },
      CriarAnimalInput: {
        type: "object",
        required: ["nome", "especie", "idade", "porte", "esquemaVacinal"],
        properties: {
          nome: {
            type: "string",
            minLength: 3,
            description: "O nome deve ter pelo menos 3 caracteres.",
            example: "Rex",
          },
          especie: {
            type: "string",
            minLength: 3,
            description: "A espécie deve ter pelo menos 3 caracteres.",
            example: "Cachorro",
          },
          raca: {
            type: "string",
            example: "Labrador",
          },
          idade: {
            type: "integer",
            maximum: new Date().getFullYear(),
            description: "A idade deve ser um número inteiro.",
            example: 3,
          },
          porte: {
            type: "string",
            minLength: 3,
            description: "O porte deve ter pelo menos 3 caracteres.",
            example: "Grande",
          },
          esquemaVacinal: {
            type: "string",
            minLength: 3,
            description: "O esquemaVacinal deve ter pelo menos 3 caracteres.",
            example: "Completo",
          },
          status: {
            type: "string",
            example: "Disponível",
          },
          idAbrigo: {
            type: "string",
            example: "65f1a2b3c4d5e6f7a8b9c0d2",
          },
          idAdotante: {
            type: "string",
            nullable: true,
            example: null,
          },
          capa: {
            type: "string",
            format: "uri",
            description: "A capa deve ser uma URL válida ou string vazia.",
            example: "https://exemplo.com/imagens/rex.jpg",
          },
        },
      },
      AtualizarParcialAnimalInput: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            minLength: 3,
            example: "Rex Atualizado",
          },
          especie: {
            type: "string",
            minLength: 3,
            example: "Cachorro",
          },
          raca: {
            type: "string",
            example: "Golden Retriever",
          },
          idade: {
            type: "integer",
            maximum: new Date().getFullYear(),
            example: 4,
          },
          porte: {
            type: "string",
            minLength: 3,
            example: "Médio",
          },
          esquemaVacinal: {
            type: "string",
            minLength: 3,
            example: "Em andamento",
          },
          status: {
            type: "string",
            example: "Adotado",
          },
          idAbrigo: {
            type: "string",
            example: "65f1a2b3c4d5e6f7a8b9c0d2",
          },
          idAdotante: {
            type: "string",
            example: "65f1a2b3c4d5e6f7a8b9c0d9",
          },
          capa: {
            type: "string",
            format: "uri",
            example: "https://exemplo.com/imagens/rex-novo.jpg",
          },
        },
      },
      MensagemErro: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Mensagem descritiva do erro.",
          },
        },
      },
    },
    parameters: {
      AnimalIdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "ID do animal no formato ObjectId do MongoDB (24 caracteres hexadecimais)",
        schema: {
          type: "string",
          pattern: "^[0-9a-fA-F]{24}$",
          example: "65f1a2b3c4d5e6f7a8b9c0d1",
        },
      },
    },
  },
  paths: {
    "/animais": {
      get: {
        tags: ["Animais"],
        summary: "Listar todos os animais",
        description: "Retorna uma lista com todos os animais cadastrados no banco de dados.",
        responses: {
          "200": {
            description: "Lista de animais retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Animal",
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor ao buscar relação de animais.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao buscar relação de animais.",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Animais"],
        summary: "Cadastrar um novo animal",
        description: "Valida os dados via Zod e cria um novo registro de animal.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarAnimalInput",
              },
              example: {
                nome: "Thor",
                especie: "Cachorro",
                raca: "Bulldog Francês",
                idade: 2,
                porte: "Pequeno",
                esquemaVacinal: "Completo",
                status: "Disponível",
                idAbrigo: "65f1a2b3c4d5e6f7a8b9c0d2",
                capa: "https://exemplo.com/imagens/thor.jpg",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Animal cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal cadastrado com sucesso!",
                    },
                    animal: {
                      $ref: "#/components/schemas/Animal",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação dos dados enviados ou falha ao cadastrar animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao cadastrar animal.",
                },
              },
            },
          },
          "500": {
            description: "Erro interno no servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
              },
            },
          },
        },
      },
    },
    "/animais/busca": {
      get: {
        tags: ["Animais"],
        summary: "Filtrar animais por critérios opcionais",
        description: "Busca animais filtrando por raça, espécie, porte e/ou esquema vacinal via query params.",
        parameters: [
          {
            name: "raca",
            in: "query",
            required: false,
            description: "Filtrar pela raça exata do animal",
            schema: {
              type: "string",
              example: "Siamês",
            },
          },
          {
            name: "especie",
            in: "query",
            required: false,
            description: "Filtrar pela espécie exata do animal",
            schema: {
              type: "string",
              example: "Gato",
            },
          },
          {
            name: "porte",
            in: "query",
            required: false,
            description: "Filtrar pelo porte do animal (busca parcial case-insensitive)",
            schema: {
              type: "string",
              example: "Médio",
            },
          },
          {
            name: "esquemaVacinal",
            in: "query",
            required: false,
            description: "Filtrar pelo esquema vacinal (busca parcial case-insensitive)",
            schema: {
              type: "string",
              example: "Completo",
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de animais filtrados retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Animal",
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao filtrar animais.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao filtrar animais.",
                },
              },
            },
          },
        },
      },
    },
    "/animais/{id}": {
      get: {
        tags: ["Animais"],
        summary: "Buscar um animal pelo ID",
        description: "Retorna os detalhes de um animal específico a partir de seu ObjectId.",
        parameters: [
          {
            $ref: "#/components/parameters/AnimalIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Animal encontrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Animal",
                },
              },
            },
          },
          "400": {
            description: "Formato de ID inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "ID do animal inválido.",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado na base de dados.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado.",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao buscar animal por ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao buscar animal por ID.",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Animais"],
        summary: "Atualizar um animal completamente",
        description: "Substitui todos os dados obrigatórios e opcionais de um animal existente pelo ID.",
        parameters: [
          {
            $ref: "#/components/parameters/AnimalIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarAnimalInput",
              },
              example: {
                nome: "Mia",
                especie: "Gato",
                raca: "Persa",
                idade: 4,
                porte: "Pequeno",
                esquemaVacinal: "Completo",
                status: "Disponível",
                idAbrigo: "65f1a2b3c4d5e6f7a8b9c0d2",
                capa: "https://exemplo.com/imagens/mia.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Animal atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal atualizado com sucesso!",
                    },
                    animal: {
                      $ref: "#/components/schemas/Animal",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "ID inválido, falha na validação do Zod ou erro ao atualizar animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "ID do animal inválido.",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno no servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Animais"],
        summary: "Atualizar um animal parcialmente",
        description: "Atualiza apenas os campos informados no corpo da requisição para o animal especificado.",
        parameters: [
          {
            $ref: "#/components/parameters/AnimalIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizarParcialAnimalInput",
              },
              example: {
                status: "Adotado",
                idAdotante: "65f1a2b3c4d5e6f7a8b9c0d9",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Animal atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal atualizado parcialmente com sucesso!",
                    },
                    animal: {
                      $ref: "#/components/schemas/Animal",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "ID inválido ou dados inválidos na validação parcial.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "ID do animal inválido.",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao atualizar parcialmente o animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao atualizar parcialmente o animal.",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Animais"],
        summary: "Remover um animal",
        description: "Exclui permanentemente um animal da base de dados pelo ID.",
        parameters: [
          {
            $ref: "#/components/parameters/AnimalIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Animal removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal removido com sucesso!",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "ID do animal inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "ID do animal inválido.",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao remover o animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao remover o animal.",
                },
              },
            },
          },
        },
      },
    },
  },
} as const;