import {body, ValidationChain} from "express-validator";

const title = body('title')
    .exists().withMessage('title is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({min: 1, max: 30}).withMessage(`name's length must be between 1 and 30 characters`)

const shortDescription = body('shortDescription')
    .exists().withMessage('shortDescription is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({min: 1, max: 100}).withMessage(`name's length must be between 1 and 100 characters`)

const content = body('content')
    .exists().withMessage('content is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({min: 1, max: 1000}).withMessage(`name's length must be between 1 and 1000 characters`)

const blogId = body('blogId')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({min: 1}).withMessage(`name's length mustn't be empty`)

export const postInputDtoValidation: ValidationChain[] = [
    title,
    shortDescription,
    content,
    blogId,
]