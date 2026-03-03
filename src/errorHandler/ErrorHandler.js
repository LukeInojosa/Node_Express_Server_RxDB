import { Error } from "mongoose"

export default function errorHandler (error,req,res,next){
    if(!error) {res.status(404).
    send({
        status: 404,
        message: "falta de página"
    })}
    else {res.status(400).
    send({
        status: error?.status || 400,
        type: error.name,
        message: error.message,
        errors: error?.errors || {}
    })}
    next()
}