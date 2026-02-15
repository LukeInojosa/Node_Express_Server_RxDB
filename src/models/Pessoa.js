import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema({
    nome: String
})

const pessoaModel = mongoose.model('pessoa', pessoaSchema)

export {pessoaSchema, pessoaModel}