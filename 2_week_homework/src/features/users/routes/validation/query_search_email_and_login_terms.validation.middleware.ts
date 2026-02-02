import {ValidationChain, query} from "express-validator";

const emailSearchTermValidation = query('searchEmailTerm')
    .optional()
    .isString()
    .trim()
    .isLength({max: 100})
    .withMessage(`Search term mustn't be greater than 100`)

const loginSearchTermValidation = query('searchLoginTerm')
    .optional()
    .isString()
    .trim()
    .isLength({max: 10})
    .withMessage(`Search term mustn't be greater than 10`)


export const querySearchEmailAndLoginTermsValidationMiddleware: ValidationChain[] = [
    emailSearchTermValidation,
    loginSearchTermValidation
]