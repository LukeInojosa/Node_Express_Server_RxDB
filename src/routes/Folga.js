// router é um middleware que registra rotas
import { Router } from "express";
import { folgaModel } from "../models/Folga.js";
import { pessoaModel } from "../models/Pessoa.js";
import BaseError from "../errorHandler/BaseError.js";

const router = new Router({mergeParams:true})

router.get('/', async (req, res, next) => {
    try{
        const folgas = await folgaModel.
        find(req.query).
        populate('pessoa').
        exec()
        res.status(200).send({
            status:200,
            folgas
        })
    }catch (err){
        next(err)
    }
})

router.post('/', async (req,res, next) => {
    try{
        let {id = null, nome = null , data} = req.body
        if(id) {
            const folgaCriada = await folgaModel.create({pessoa: id, data})
            res.status(200).send({
                status: 200,
                folgaCriada
            })
        }else if (nome){
            const {_id} = await pessoaModel.findOne({nome})
            if(!_id) {
                throw new Error('id não existe')
            }
            const folgaCriada = await folgaModel.create({pessoa: _id, data})
            res.status(200).send({
                status: 200,
                folgaCriada
            })
        }else{
            throw new BaseError(400, "bad request")
        }
    }catch (err) {
        next(err)
    }
    
})

router.delete('/' ,async (req, res, next) => {
    try{
        
        const {nome, data} = req.query
        const [dia,mes, ano] = data ? data.split('/'): [] 
        let query = {}

        if(nome){
            const {_id} = await pessoaModel.findOne({nome})
            query.pessoa = _id
        }
        if(data){
            query.data = dia? {...query.data, dia: Number(dia)}: query.data
            query.data = mes? {...query.data, mes: Number(mes)}: query.data
            query.data = ano? {...query.data, ano: Number(ano)}: query.data
        }

        const {deletedCount} = await folgaModel.deleteMany(query)

        if (deletedCount > 0){
            res.status(200).send({
                status: 200,
                deletedCount
            })
        }else{
            res.status(200).send({
                status:200,
                message: 'Não foi deletado nenhum dado'
            })  
        }
    }catch (err){
        next(err)
    }
})

export default router