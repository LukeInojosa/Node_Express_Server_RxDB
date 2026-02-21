import mongoose from "mongoose";
import {pessoaSchema} from "./Pessoa.js";
import Controller from "../controllers/Folga.js";
import { diaSchema } from "./Dia.js";

const folgaSchema = new mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.ObjectId,
        ref: 'pessoa',
        required: true
    },
    data: {
        type: diaSchema,
        required: true
    }
});

folgaSchema.loadClass(Controller)

const folgaModel = mongoose.model('folga',folgaSchema);

export {folgaSchema, folgaModel}