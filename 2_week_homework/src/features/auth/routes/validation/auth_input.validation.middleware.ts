import {body, ValidationChain} from "express-validator";


const loginOrEmailValidation = body("loginOrEmail")
    .exists()
    .isString()
    .withMessage(`Email or Login isn't correct`)
const passwordValidation: ValidationChain = body('password')
    .exists()
    .withMessage('Passwords required')
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('Length must be between 6 and 20 characters')


export const authInputValidation: ValidationChain[] = [
    loginOrEmailValidation,
    passwordValidation,
]