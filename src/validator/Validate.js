import { check } from "express-validator"
import Sanitizer from "./Sanitizers.js"
import Validator from "./Validators.js"

export default class Validate{
    static data(fieldName,isOptional = true){
        return check(fieldName)
            .optional(isOptional)
            .isString()
            .custom(Validator.isDate).withMessage('campo não possui formato de data')
            .customSanitizer(Sanitizer.convertToSystemDate)
    }

    static nome(fieldName, isOptional = true){
        return check(fieldName)
            .optional(isOptional)
            .isString()
            .trim()
            .isLength({min: 3}).withMessage('o nome deve ter pelo menos 3 caracteres')
            .toLowerCase()
    }
}

