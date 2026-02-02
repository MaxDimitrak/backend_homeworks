import {body, ValidationChain} from "express-validator";

const loginRegExp: string = '^[a-zA-Z0-9_-]*$';
const emailRegExp: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

const loginValidation: ValidationChain = body('login')
    .exists()
    .withMessage('Login required')
    .trim()
    .isLength({min: 3, max: 10})
    .withMessage('Length must be between 3 and 10 characters')
    .matches(loginRegExp)
    .withMessage('Letters, numbers and sign _- only allowed')

const passwordValidation: ValidationChain = body('password')
    .exists()
    .withMessage('Passwords required')
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('Length must be between 6 and 20 characters')

const emailValidation: ValidationChain = body('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .matches(emailRegExp)
    .withMessage('Should be an email address')


export const userInputDtoValidationMiddleware: ValidationChain[] = [
    loginValidation,
    passwordValidation,
    emailValidation
]