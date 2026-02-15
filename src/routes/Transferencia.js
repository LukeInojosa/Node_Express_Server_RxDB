// router é um middleware que registra rotas
import { Router } from "express";

const router = new Router()

router.get('/', (req, res) => {
    res.send('transferencia')
})

export default router