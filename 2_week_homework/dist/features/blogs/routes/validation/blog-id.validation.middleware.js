"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdValidation = void 0;
const express_validator_1 = require("express-validator");
exports.blogIdValidation = (0, express_validator_1.param)('blogId')
    .exists().withMessage('Id is required')
    .isString().withMessage('Id must be a string')
    .trim()
    .notEmpty().withMessage(`Id mustn't be empty`)
    .isMongoId().withMessage('incorrect id');
