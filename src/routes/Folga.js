// router é um middleware que registra rotas
import { Router } from "express";
import { folgaModel } from "../models/Folga.js";
import { pessoaModel } from "../models/Pessoa.js";
import BaseError from "../errorHandler/BaseError.js";
import Validate from "../validator/Validate.js";
import validator from "../validator/multiValidator.js";
import { extractNotNullValues } from "./utils.js";

const router = new Router({mergeParams:true})

router.get('/entre',
    validator([Validate.data('comeco'), Validate.data('fim'), Validate.nome('nome')]) ,
    async (req, res, next) => {
        try{
            const {nome,comeco, fim} = req.validated.query
            
            const result = await folgaModel.find(
                extractNotNullValues({
                    nome: nome,
                    data:{
                        $gte: comeco,
                        $lte: fim
                    }
                })
            ).sort({data:1})
            .populate('pessoa')

            res.status(200).send({
                status: 200,
                result
            })
        }catch(err) {
            next(err)
        } 
})



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

router.post('/', 
    validator([ Validate.data('data'), Validate.nome('nome')]),
    async (req,res, next) => {
        try{
            let {id, nome, data} = req.validated.body
            // se tem o id, cria a pessoa
            if(id) {
                const folgaCriada = await folgaModel.create({pessoa: id, data})
                res.status(200).send({
                    status: 200,
                    folgaCriada
                })
            // se tem o nome da pessoa, encontra o id e cria a pessoa
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
                throw new BaseError(400, "forneça o id ou o nome da pessoa")
            }
        }catch (err) {
            next(err)
        }

})

router.delete('/' ,
    validator([Validate.data('data'), Validate.nome('nome')]),
    async (req, res, next) => {
        try{
            const {id, nome, data} = req.validated.query

            const {deletedCount} = await folgaModel.deleteMany(
                extractNotNullValues({
                    _id: id,
                    nome, 
                    data
                })
            )

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

// router.get('/intervalo', async (req,res,next) => {
//     try{
//         const dataCampos = ["dia", "mes","ano"]
//         let {data, pagina, folhas} = req.query

//         data = data.
//         split('/').
//         map((value,i) => [dataCampos[i], parseInt(value)]).
//         filter((value) => value)

//         data = Object.fromEntries(data)

//         pagina = parseInt(pagina)

//         folhas = parseInt(folhas)

//         const folgas = await folgaModel.
//         find({"data.ano": {$gte : data.ano}, "data.mes": {$gte: data.mes}, "data.dia": {$gte: data.dia}}).
//         sort({'data.ano': 1,'data.mes': 1, 'data.dia': 1}).
//         skip((pagina-1)*folhas).
//         limit(folhas).
//         populate('pessoa').
//         exec()

//         res.status(200).send({
//             status:200,
//             folgas
//         })
//     } catch(err){
//         next(err)
//     }

// })

// router.get('/intapos', async (req,res,next) => {
    

// })
export default router