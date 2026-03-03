export default class Validator {
    static isDate(valor) {
        const regData = /\d{1,2}\/\d{1,2}\/\d{4,}/
        return regData.test(valor)
    }
}