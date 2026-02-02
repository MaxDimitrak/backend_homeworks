"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInputValidation = void 0;
const express_validator_1 = require("express-validator");
const loginOrEmailValidation = (0, express_validator_1.body)("loginOrEmail")
    .exists()
    .isString()
    .withMessage(`Email or Login isn't correct`);
const passwordValidation = (0, express_validator_1.body)('password')
    .exists()
    .withMessage('Passwords required')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Length must be between 6 and 20 characters');
exports.authInputValidation = [
    loginOrEmailValidation,
    passwordValidation,
];
