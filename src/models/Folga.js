import mongoose from "mongoose";
import {pessoaSchema} from "./Pessoa.js";

const folgaSchema = new mongoose.Schema({
    pessoa: pessoaSchema,
    data: {
        dia: Number,
        mes: Number,
        ano: Number
    }
});

const folgaModel = mongoose.model('folga',folgaSchema);

export {folgaSchema, folgaModel}