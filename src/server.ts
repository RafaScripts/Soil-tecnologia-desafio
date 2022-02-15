// importação das blibiotecas e rotas
import express from "express";
import cors from "cors";
import routes from "./routes";

// inicialização do server
const app = express();

app.use(cors());

// declarando que usara JSON para comunicação
app.use(express.json());

// utilização das rotas
app.use(routes);

// aberta a escuta das informações na porta 3333
app.listen(process.env.PORT || 3333);
