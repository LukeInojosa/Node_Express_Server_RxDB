export default class BaseError extends Error{
    constructor(status = 404, message = "falta de pagina") {
        super(message)
        this.status = status
    }
}