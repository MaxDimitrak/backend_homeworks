import {body, ValidationChain} from "express-validator";

const nameValidation: ValidationChain = body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({min: 1, max: 15}).withMessage(`name's length must be between 1 and 15 characters`)

const descriptionValidation = body('description')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({min: 1, max: 500}).withMessage(`description's length must be between 1 and 500 characters`)

const webSiteUrlRexEx = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
const websiteUrl: ValidationChain = body('websiteUrl')
    .exists().withMessage('websiteUrl is required')
    .isString().withMessage('websiteUrl must be a string')
    .matches(webSiteUrlRexEx).withMessage('websiteUrl must follow next pattern: "^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$"')
    .trim()
    .isLength({min: 1, max: 100}).withMessage(`websiteUrl's length must be between 1 and 500 characters`)


export const blogInputDtoValidation: ValidationChain[] = [
    nameValidation,
    descriptionValidation,
    websiteUrl

]