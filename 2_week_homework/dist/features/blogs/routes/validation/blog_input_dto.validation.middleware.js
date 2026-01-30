"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputDtoValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({ min: 1, max: 15 }).withMessage(`name's length must be between 1 and 15 characters`);
const descriptionValidation = (0, express_validator_1.body)('description')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage(`description's length must be between 1 and 500 characters`);
const webSiteUrlRexEx = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
const websiteUrl = (0, express_validator_1.body)('websiteUrl')
    .exists().withMessage('websiteUrl is required')
    .isString().withMessage('websiteUrl must be a string')
    .matches(webSiteUrlRexEx).withMessage('websiteUrl must follow next pattern: "^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$"')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage(`websiteUrl's length must be between 1 and 500 characters`);
exports.blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrl
];
