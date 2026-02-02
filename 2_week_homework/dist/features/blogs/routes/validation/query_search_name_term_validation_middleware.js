"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySearchNameTermValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
exports.querySearchNameTermValidationMiddleware = (0, express_validator_1.query)('searchNameTerm')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage(`Search term mustn't be greater than 50`);
