// router é um middleware que registra rotas
import { Router } from "express";
import { pessoaModel } from "../models/Pessoa.js";
import { transfModel } from "../models/Transferencia.js";
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
        let {id, nome, origem, destino} = req.query
        const campos = ['.dia', '.mes', '.ano']
        let query = {}

        if (origem){
            origem = origem.
            split('/').
            map((val,i) => ['origem' + campos[i], Number(val)] ).
            filter(([key, value]) => value)

            origem = Object.fromEntries(origem)
            query = {...query, ...origem}
        }
        
        if(destino){
            destino = destino.
            split('/').
            map((val,i) => ['destino' + campos[i], Number(val)]).
            filter(([key, value]) => value)

            destino = Object.fromEntries(destino)
            query = {...query, ...destino}
        }

        if(id) query = {...query, pessoa: id}
        else if (nome){
            const pessoa = await pessoaModel.findOne({nome})
            if(pessoa){
                query =  {...query, pessoa: pessoa}
            }else{
                res.status(200).send({
                    status: 200,
                    message: "pessoa não existe"
                })
            }
        }

        console.log(query)
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