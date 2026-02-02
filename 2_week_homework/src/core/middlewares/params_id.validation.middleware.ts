import {param, ValidationChain} from "express-validator";


export const idValidation: ValidationChain = param('id')
    .exists().withMessage('Id is required')
    .isString().withMessage('Id must be a string')
    .trim()
    .notEmpty().withMessage(`Id mustn't be empty`)
    .isMongoId().withMessage('incorrect id')