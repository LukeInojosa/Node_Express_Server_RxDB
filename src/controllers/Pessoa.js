import { pessoaModel } from "../models/Pessoa.js"

export default class Controller{
    static async getAll(){
        return await pessoaModel.find({})
    }
    async insert(){
        return await this.save()
    }
}