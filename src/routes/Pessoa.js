// router é um middleware que registra rotas
import { Router } from "express";
import { pessoaModel } from "../models/Pessoa.js"
import BaseError from "../errorHandler/BaseError.js";

const router = new Router({mergeParams:true})

router.post('/', async (req, res, next) => {
    try{
        const pessoaSaved = await new pessoaModel(req.body).insert()
        
        res.status(200).send({
            status: 200,
            pessoaSaved
        })

    }catch(err) {
        next(err)
    } 
    
})

router.get('/', async (req, res, next) => {
    try{
        const pessoas = await pessoaModel.find(req.query)
        res.status(200).send({
            status: 200,
            pessoas
        })
    }catch (err){
        next(err)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        const deletedData = await pessoaModel.findOne(req.query).exec()
        if(deletedData){
            const {deletedCount} = await pessoaModel.deleteOne({_id:deletedData._id}).exec()
            if(deletedCount > 0){
                res.status(200).send({
                    status:200,
                    deletedData
                })
            }else{
                throw new BaseError(404, "Não foi possivel deletar pessoa")
            }
        }else{
            throw new BaseError(200, "Não é possível deletar pessoa inexistente")
        }
    }catch (err){
        next(err)
    }
})



export default router