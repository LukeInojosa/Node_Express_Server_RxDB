// router é um middleware que registra rotas
import { Router } from "express";
import { folgaModel } from "../models/Folga.js";
import { pessoaModel } from "../models/Pessoa.js";

const router = new Router({mergeParams:true})

router.get('/', async (req, res) => {
    try{
        const folgas = await folgaModel.
        find(req.query).
        populate('pessoa').
        exec()
        res.status(200).send(folgas)
    }catch (err){
        res.status(404).send({
            status: 404,
            message: err.message
        })
    }
})

router.post('/', async (req,res) => {
    try{
        let {id = null, nome = null , data} = req.body
        if(id) {
            const folgaCriada = await folgaModel.create({pessoa: id, data})
            res.status(200).send({
                status: 200,
                folgaCriada
            })
        }else if (nome){
            const {_id} = await pessoaModel.find({nome})
            if(!_id) {
                throw new Error('id não existe')
            }
            const response = await folgaModel.create({pessoa: _id, data})
            res.status(200).send({
                status: 200,
                folgaCriada
            })
        }
        
    }catch (err) {
        console.log(err)
        res.status(404).send({
            status: 404,
            message: err.message
        })
    }
    
})

router.delete('/' ,async (req, res) => {
    try{
        const {nome, data} = req.query
        const [dia,mes, ano] = data.split('/')
        let query = {}

        if(nome){
            const {_id} = await pessoaModel.findOne({nome})
            query.pessoa = _id
        }

        query.data = dia? {...query.data, dia: Number(dia)}: query.data
        query.data = mes? {...query.data, mes: Number(mes)}: query.data
        query.data = ano? {...query.data, ano: Number(ano)}: query.data

        
        console.log(query)
        const {deletedCount} = await folgaModel.deleteMany(query)
        if (deletedCount > 0){
            res.status(200).send({
                status: 200,
                deletedData
            })
        }else{
            res.status(200).send({
                status:200,
                message: 'Não foi deletado nenhum dado'
            })  
        }
    }catch (err){
        res.status(404).send({
            status: 404,
            message: err.message
        })
    }
})

export default router