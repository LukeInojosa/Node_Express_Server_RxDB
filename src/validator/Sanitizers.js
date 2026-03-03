export default class Sanitizer{
    static convertToSystemDate(valor){
        return valor.split('/')
            .reverse()
            .join('-')
    }
    static convertToUserDate(valor){
        return valor.split('-')
            .reverse()
            .join('/')
    }
}