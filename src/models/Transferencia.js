import mongoose from "mongoose";
import {pessoaSchema} from "./Pessoa.js";
import Controller from "../controllers/Transferencia.js";

const transfSchema = new mongoose.Schema({
    pessoa: pessoaSchema,
    origem: {
        dia: Number,
        mes: Number,
        ano: Number
    }
})

transfSchema.loadClass(Controller)

const transfModel = mongoose.model('transferencias',transfSchema)

export {transfSchema, transfModel}