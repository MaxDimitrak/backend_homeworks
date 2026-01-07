"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = void 0;
const express_validator_1 = require("express-validator");
exports.idValidation = (0, express_validator_1.param)('id')
    .exists().withMessage('Id is required')
    .isNumeric().withMessage('Id must be a numeric string')
    .isString().withMessage('Id must be a string')
    .trim()
    .isLength({ min: 1 }).withMessage(`Id mustn't be empty`);
