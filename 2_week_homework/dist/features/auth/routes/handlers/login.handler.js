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
exports.loginHandler = loginHandler;
const auth_service_1 = require("../../application/auth.service");
const http_responses_1 = require("../../../../core/types/http_responses");
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginDto = req.body;
        const authResult = yield auth_service_1.authService.loginUser(loginDto);
        if (authResult) {
            res.sendStatus(http_responses_1.http_response.no_content);
            return;
        }
        res.sendStatus(http_responses_1.http_response.unauthorized);
    });
}
