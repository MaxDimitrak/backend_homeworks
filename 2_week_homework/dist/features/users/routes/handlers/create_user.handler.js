"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = createUserHandler;
const errors_handler_1 = require("../../../../core/errors/errors.handler");
const users_service_1 = require("../../application/users.service");
const users_query_service_1 = require("../../application/users.query.service");
const http_responses_1 = require("../../../../core/types/http_responses");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUserDto = req.body;
            const createdUserIdOrFail = yield users_service_1.usersService.createUser(newUserDto);
            if (typeof createdUserIdOrFail !== "string") {
                res.status(http_responses_1.http_response.bad_request).send(createdUserIdOrFail);
                return;
            }
            const newUser = yield users_query_service_1.usersQueryService.findUserById(createdUserIdOrFail);
            if (!newUser) {
                res.sendStatus(http_responses_1.http_response.internal_server_error);
                return;
            }
            res.status(http_responses_1.http_response.created).send(newUser);
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
