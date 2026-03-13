import mongoose from "mongoose";
import Controller from "../controllers/Folga.js";

const folgaSchema = new mongoose.Schema({
    pessoa: {
        type: mongoose.Schema.ObjectId,
        ref: 'pessoa',
        required: true
    },
    data: {
        type: Date,
        required: true
    }
}, {versionKey:false});

folgaSchema.index({pessoa:1, data:1}, {unique: true})
folgaSchema.loadClass(Controller)

const folgaModel = mongoose.model('folga',folgaSchema);
export {folgaSchema, folgaModel}