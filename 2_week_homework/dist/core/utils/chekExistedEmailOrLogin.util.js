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
exports.chekExistedEmailOrLoginUtil = chekExistedEmailOrLoginUtil;
const errors_util_1 = require("./errors.util");
const users_repository_1 = require("../../features/users/infrastructure/users.repository");
function chekExistedEmailOrLoginUtil(field, param) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUserByParam = yield users_repository_1.usersRepository.findUserByEmailOrLogin(param);
        if (foundUserByParam) {
            return (0, errors_util_1.createErrorMessages)([{ message: `${field} should be unique`, field: `${field}` }]);
        }
        return null;
    });
}
