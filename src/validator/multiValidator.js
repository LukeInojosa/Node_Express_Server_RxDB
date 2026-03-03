import BaseError from "../errorHandler/BaseError.js"
import { matchedData, param } from "express-validator"

export default function validator(validations, options) {
    return async (req,res,next) => {
        for (const validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()) {
                next(new BaseError(400, "erro de validação de dados", result.array()))
            }
        }
        try{
            req.validated = {query: {}, body: {}, params: {}}
            
            Object.entries(matchedData(req, {location: ['query']} )).forEach(([key,value]) => {req.validated.query[key] = value})
            Object.entries(matchedData(req, {location: ['body']} )).forEach(([key,value]) => {req.validated.body[key] = value})
            Object.entries(matchedData(req, {location: ['params']} )).forEach(([key,value]) => {req.validated.params[key] = value})
        } catch(err){
            console.log(err)
        }  
        next()
    }
}