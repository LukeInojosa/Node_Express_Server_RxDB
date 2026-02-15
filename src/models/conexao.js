import mongoose from "mongoose"

//estabelece conexão com mongoDB 
const database_name = 'database'

export default async function estabelecerConexao() {
    try{
        await mongoose.connect(`mongodb+srv://teste:teste@cluster0.bn9gn4s.mongodb.net/${database_name}?appName=Cluster0`)
        console.log('# Sucesso ao estabelecer conexão com banco de dados')
        return true
    }catch (err){
        console.error(err)
        return false
    }
}