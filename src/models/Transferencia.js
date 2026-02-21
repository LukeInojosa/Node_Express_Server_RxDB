import mongoose from "mongoose";
import {pessoaSchema} from "./Pessoa.js";
import Controller from "../controllers/Transferencia.js";
import { diaSchema } from "./Dia.js";

const transfSchema = new mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.ObjectId,
        ref: 'pessoa',
        required: true
    },
    origem: {
        type: diaSchema,
        required: true
    },
    destino: {
        type: diaSchema,
        required: true
    }
})

transfSchema.loadClass(Controller)

const transfModel = mongoose.model('transferencia',transfSchema)

export {transfSchema, transfModel}