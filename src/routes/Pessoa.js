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



export default router