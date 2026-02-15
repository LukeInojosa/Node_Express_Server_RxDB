import routerPessoa from './routes/Pessoa.js'
import routerFolga from './routes/Folga.js'
import routerTransferencia from './routes/Transferencia.js'

export default function registrarRotas(app){
    app.use('/pessoa', routerPessoa)
    app.use('/folga', routerFolga)
    app.use('/transferencia', routerTransferencia)
}