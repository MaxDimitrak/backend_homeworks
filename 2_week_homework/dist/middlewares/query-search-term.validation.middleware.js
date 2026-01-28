"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySearchTermValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
exports.querySearchTermValidationMiddleware = (0, express_validator_1.query)('searchTerm')
    .isString()
    .isLength({ max: 50 })
    .withMessage(`Search term mustn't be greater than 50`);
