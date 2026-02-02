"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySearchEmailAndLoginTermsValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const emailSearchTermValidation = (0, express_validator_1.query)('searchEmailTerm')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage(`Search term mustn't be greater than 100`);
const loginSearchTermValidation = (0, express_validator_1.query)('searchLoginTerm')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 10 })
    .withMessage(`Search term mustn't be greater than 10`);
exports.querySearchEmailAndLoginTermsValidationMiddleware = [
    emailSearchTermValidation,
    loginSearchTermValidation
];
