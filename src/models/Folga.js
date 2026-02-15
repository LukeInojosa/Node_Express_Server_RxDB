import mongoose from "mongoose";
import {pessoaSchema} from "./Pessoa.js";
import Controller from "../controllers/Folga.js";

const folgaSchema = new mongoose.Schema({
    pessoa: pessoaSchema,
    data: {
        dia: Number,
        mes: Number,
        ano: Number
    }
});

folgaSchema.loadClass(Controller)

const folgaModel = mongoose.model('folga',folgaSchema);

export {folgaSchema, folgaModel}