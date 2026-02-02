"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const delete_all_data_handler_1 = require("./handlers/delete_all_data.handler");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/all-data', delete_all_data_handler_1.deleteAllDataHandler);
