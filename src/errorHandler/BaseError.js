export default class BaseError extends Error{
    constructor(status = 404, message = "falta de pagina",errors = {}) {
        super(message)
        this.status = status
        this.errors = errors
    }
}