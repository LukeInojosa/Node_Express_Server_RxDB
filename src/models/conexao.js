import mongoose from "mongoose"
import { folgaModel } from "./Folga.js"
import { pessoaModel } from "./Pessoa.js"
import { transfModel } from "./Transferencia.js"

export default async function estabelecerConexao() {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        await folgaModel.init()
        await pessoaModel.init()
        await transfModel.init()
        console.log('# Sucesso ao estabelecer conexão com banco de dados')
        return true
    }catch (err){
        console.error(err)
        return false
    }
}