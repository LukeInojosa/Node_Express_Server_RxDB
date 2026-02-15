// router é um middleware que registra rotas
import { Router } from "express";
import { pessoaModel } from "../models/Pessoa.js"

const router = new Router({mergeParams:true})

router.get('/', async (req, res) => {
    console.log(await pessoaModel.getAll())
    res.send('pessoa')
})

export default router