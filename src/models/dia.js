import mongoose from "mongoose";

const diaSchema = mongoose.Schema({
    dia: {
            type:Number,
            required: true,
            min: 1,
            max: 31
        },
    mes: {
            type:Number,
            required: true,
            min:1,
            max: 12
        },
    ano: {
            type: Number,
            required: true,
            min: () => {
                return Number((new Date()).getFullYear)
            }
        }
})

const diaModel = mongoose.model('dia',diaSchema)

export {diaSchema, diaModel}