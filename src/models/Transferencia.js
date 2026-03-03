import mongoose from "mongoose";
import Controller from "../controllers/Transferencia.js";

const transfSchema = new mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.ObjectId,
        ref: 'pessoa',
        required: true
    },
    origem: {
        type: Date,
        required: true
    },
    destino: {
        type: Date,
        required: true
    }
}, {versionKey:false})

transfSchema.loadClass(Controller)

const transfModel = mongoose.model('transferencia',transfSchema)

export {transfSchema, transfModel}