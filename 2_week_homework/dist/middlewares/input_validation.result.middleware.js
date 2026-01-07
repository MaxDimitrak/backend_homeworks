"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResult = void 0;
const express_validator_1 = require("express-validator");
const http_responses_1 = require("../core/types/http_responses");
const errors_util_1 = require("../core/utils/errors.util");
const formatErrors = (errors) => ({
    message: errors.msg,
    field: errors.type === 'field' ? errors.path : errors.type
});
const inputValidationResult = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length) {
        res.status(http_responses_1.http_response.bad_request).send((0, errors_util_1.createErrorMessages)(errors));
        return;
    }
    next();
};
exports.inputValidationResult = inputValidationResult;
