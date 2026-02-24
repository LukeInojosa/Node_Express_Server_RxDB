// router é um middleware que registra rotas
import { Router } from "express";
import { pessoaModel } from "../models/Pessoa.js";
import { transfModel, transfSchema } from "../models/Transferencia.js";
import BaseError from "../errorHandler/BaseError.js";

const router = new Router({mergeParams:true})

router.post('/', async (req,res,next) => {
    try{
        const {id, nome, origem, destino} = req.body
        
        let _id = null
        if(id) _id = id
        else if(nome) _id = await pessoaModel.findOne({nome}) 

        if(_id !== null){
            const transf  = await transfModel.create({
                pessoa: _id,
                origem,
                destino
            })
            res.status(200).send({
                status: 200,
                transf
            })
        }else{
            throw new BaseError(404, "pessoa não existe")
        }
    }catch (err){
        next(err)
    }

})

router.get('/', async (req, res, next) => {
    try{
        const {id, nome, origem, destino} = req.query
        let query = {}
        if(id) query = {pessoa: id, origem, destino}
        else if (nome){
            const pessoa = await pessoaModel.findOne({nome})
            if(pessoa){
                query =  {pessoa: pessoa, origem, destino}
            }else{
                res.status(200).send({
                    status: 200,
                    message: "pessoa não existe"
                })
            }
        }
        const transferencias = await transfModel.find(query)
        res.status(200).send({
            status : 200,
            transferencias
        })
    }catch (err){
        next(err)
    }
})


router.delete('/', async (req, res, next) => {
    try{
        const {id} = req.query
        const {deletedCount} = await transfModel.deleteOne({_id: id})
        res.status(200).send({
            status: 200,
            deletedCount
        })
    }catch (err){
        next(err)
    }
})
export default router