"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const login_handler_1 = require("./handlers/login.handler");
const auth_input_validation_middleware_1 = require("./validation/auth_input.validation.middleware");
const input_validation_result_middleware_1 = require("../../../core/middlewares/input_validation.result.middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/login', auth_input_validation_middleware_1.authInputValidation, input_validation_result_middleware_1.inputValidationResult, login_handler_1.loginHandler);
