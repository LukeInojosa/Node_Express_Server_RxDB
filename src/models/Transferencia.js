import mongoose from "mongoose";
import pessoaSchema from "./Pessoa.js";

const transfSchema = new mongoose.Schema({
    pessoa: pessoaSchema,
    origem: {
        dia: Number,
        mes: Number,
        ano: Number
    }
})

const transfModel = mongoose.model('transferencias',transfSchema)

export {transfSchema, transfModel}