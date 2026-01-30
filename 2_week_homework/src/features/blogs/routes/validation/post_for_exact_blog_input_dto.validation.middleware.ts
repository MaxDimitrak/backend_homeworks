import {body, ValidationChain} from "express-validator";

const title: ValidationChain = body('title')
    .exists().withMessage('title is required')
    .isString().withMessage('title must be a string')
    .trim()
    .isLength({min: 1, max: 30}).withMessage(`title length must be between 1 and 30 characters`)

const shortDescription: ValidationChain = body('shortDescription')
    .exists().withMessage('shortDescription is required')
    .isString().withMessage('shortDescription must be a string')
    .trim()
    .isLength({min: 1, max: 100}).withMessage(`shortDescription length must be between 1 and 100 characters`)

const content: ValidationChain = body('content')
    .exists().withMessage('content is required')
    .isString().withMessage('content must be a string')
    .trim()
    .isLength({min: 1, max: 1000}).withMessage(`content length must be between 1 and 1000 characters`)

export const postForExactBlogInputDtoValidation: ValidationChain[] = [
    title,
    shortDescription,
    content,
]