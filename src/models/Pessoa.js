import mongoose from "mongoose";
import Controller from "../controllers/Pessoa.js";

const pessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
})

pessoaSchema.loadClass(Controller)

const pessoaModel = mongoose.model('pessoa', pessoaSchema)

export {pessoaSchema, pessoaModel}