import app from "./src/app.js";
import "dotenv/config";

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log("Servidor em execução...");
});''