import {param, ValidationChain} from "express-validator";


export const idValidation: ValidationChain = param('id')
    .exists().withMessage('Id is required')
    .isNumeric().withMessage('Id must be a numeric string')
    .isString().withMessage('Id must be a string')
    .trim()
    .isLength({min: 1}).withMessage(`Id mustn't be empty`)