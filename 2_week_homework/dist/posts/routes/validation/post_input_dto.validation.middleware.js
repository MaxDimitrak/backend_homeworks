"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputDtoValidation = void 0;
const express_validator_1 = require("express-validator");
const title = (0, express_validator_1.body)('title')
    .exists().withMessage('title is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage(`name's length must be between 1 and 30 characters`);
const shortDescription = (0, express_validator_1.body)('shortDescription')
    .exists().withMessage('shortDescription is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage(`name's length must be between 1 and 100 characters`);
const content = (0, express_validator_1.body)('content')
    .exists().withMessage('content is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({ min: 1, max: 1000 }).withMessage(`name's length must be between 1 and 1000 characters`);
const blogId = (0, express_validator_1.body)('blogId')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({ min: 1 }).withMessage(`name's length mustn't be empty`);
exports.postInputDtoValidation = [
    title,
    shortDescription,
    content,
    blogId,
];
