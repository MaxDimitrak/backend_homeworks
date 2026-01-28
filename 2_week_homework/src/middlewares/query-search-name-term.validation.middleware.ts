import {query, ValidationChain} from "express-validator";

export const querySearchNameTermValidationMiddleware: ValidationChain = query('searchNameTerm')
    .optional()
    .isString()
    .trim()
    .isLength({max: 50})
    .withMessage(`Search term mustn't be greater than 50`)