// router é um middleware que registra rotas
import { Router } from "express";
import { pessoaModel } from "../models/Pessoa.js"

const router = new Router({mergeParams:true})

router.post('/', async (req, res) => {
    try{
        const pessoaSaved = await new pessoaModel(req.body).insert()
        
        res.status(200).send({
            status: 200,
            pessoaSaved
        })

    }catch(err) {
        console.error(err)
        res.status(400).send({
            status: 400,
            message: 'erro ao cadastrar pessoa'
        })
    } 
    
})

router.get('/', async (req, res) => {
    try{
        const response = await pessoaModel.find(req.query)
        res.status(200).send(response)
    }catch (err){
        console.error(err)
        res.status(400).send({
            status: 400,
            message: 'erro ao pegar pessoa'
        })
    }
})

router.delete('/', async (req, res) => {
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
                res.status(200).send({
                    status:200,
                    message: 'Dado existe , mas não foi possivel deletar'
                })
            }
        }else{
            res.status(200).send({
                status:200,
                message: 'Dado a ser deletado não existe'
            })
        }
    }catch (err){
        console.log(err)
    }
})



export default router