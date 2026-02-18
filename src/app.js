import routerPessoa from './routes/Pessoa.js'
import routerFolga from './routes/Folga.js'
import routerTransferencia from './routes/Transferencia.js'
import cors from 'cors'
import express from 'express'

export default function registrarRotas(app){
    app.use(cors()) // middleware para permitir requisições vindas de outras fontes
    app.use(express.json())
    app.use('/pessoa', routerPessoa)
    app.use('/folga', routerFolga)
    app.use('/transferencia', routerTransferencia)
}