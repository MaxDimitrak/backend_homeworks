import {param} from "express-validator";

export const blogIdValidation = param('blogId')
    .exists().withMessage('Id is required')
    .isString().withMessage('Id must be a string')
    .trim()
    .notEmpty().withMessage(`Id mustn't be empty`)
    .isMongoId().withMessage('incorrect id')