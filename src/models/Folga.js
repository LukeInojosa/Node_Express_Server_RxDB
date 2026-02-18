import mongoose from "mongoose";
import {pessoaSchema} from "./Pessoa.js";
import Controller from "../controllers/Folga.js";
import { diaSchema } from "./dia.js";

const folgaSchema = new mongoose.Schema({
    pessoa: pessoaSchema,
    data: diaSchema
});

folgaSchema.loadClass(Controller)

const folgaModel = mongoose.model('folga',folgaSchema);

export {folgaSchema, folgaModel}