import "dotenv/config";
import app from "./src/app.js";
import conectaNaDatabase from "./src/config/dbConnect.js";

const porta = process.env.PORT || 3000;

async function inicializarServidor() {
    try {
        console.log(
            "Variável DB encontrada:",
            Boolean(process.env.DB_CONNECTION_STRING)
        );

        const conexao = await conectaNaDatabase();

        console.log("Conexão com o MongoDB realizada com sucesso!");

        conexao.on("error", (erro) => {
            console.error("Erro ao conectar com o MongoDB:", erro);
        });

        app.listen(porta, () => {
            console.log("Servidor em execução na porta " + porta);
        });

    } catch (erro) {
        console.error(
            "Falha ao inicializar o servidor ou banco de dados:",
            erro
        );

        process.exit(1);
    }
}

inicializarServidor();