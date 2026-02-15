import express from 'express';
import estabelecerConexao from "./src/models/conexao.js";
import registrarRotas from './src/app.js';

estabelecerConexao().then( (conexao) =>{
    if(!conexao) return 
})

const PORT = 3000
const app  = express()
registrarRotas(app)

app.listen(PORT, () => {
    console.log(`# Servidor escutando na porta ${PORT}`)
})
       


