"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputDtoValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const loginRegExp = '^[a-zA-Z0-9_-]*$';
const emailRegExp = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
const loginValidation = (0, express_validator_1.body)('login')
    .exists()
    .withMessage('Login required')
    .trim()
    .isLength({ min: 3, max: 10 })
    .withMessage('Length must be between 3 and 10 characters')
    .matches(loginRegExp)
    .withMessage('Letters, numbers and sign _- only allowed');
const passwordValidation = (0, express_validator_1.body)('password')
    .exists()
    .withMessage('Passwords required')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Length must be between 6 and 20 characters');
const emailValidation = (0, express_validator_1.body)('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .matches(emailRegExp)
    .withMessage('Should be an email address');
exports.userInputDtoValidationMiddleware = [
    loginValidation,
    passwordValidation,
    emailValidation
];
