"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInputValidation = void 0;
const express_validator_1 = require("express-validator");
const loginOrEmailValidation = (0, express_validator_1.body)("loginOrEmail")
    .exists()
    .isEmail();
exports.authInputValidation = [];
