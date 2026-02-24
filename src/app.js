import routerPessoa from './routes/Pessoa.js'
import routerFolga from './routes/Folga.js'
import routerTransferencia from './routes/Transferencia.js'
import cors from 'cors'
import express from 'express'
import errorHandler from './errorHandler/ErrorHandler.js'

export default function registrarRotas(app){
    app.use(cors()) // middleware para permitir requisições vindas de outras fontes
    app.use(express.json()) // converte body para json e cria query
    app.use('/pessoa', routerPessoa)
    app.use('/folga', routerFolga)
    app.use('/transferencia', routerTransferencia)
    app.use(errorHandler)
}