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
exports.usersQueryService = void 0;
const users_query_repository_1 = require("../infrastructure/users.query.repository");
const map_to_user_util_1 = require("../routes/mappers/map_to_user.util");
const map_to_user_paginated_list_util_1 = require("../routes/mappers/map_to_user_paginated_list.util");
exports.usersQueryService = {
    getManyUsers(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { users, meta } = yield users_query_repository_1.usersQueryRepository.getManyUsers(queryDto);
            return (0, map_to_user_paginated_list_util_1.mapToUserPaginatedListUtil)(users, meta);
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield users_query_repository_1.usersQueryRepository.findUserById(id);
            if (!foundUser) {
                return null;
            }
            return (0, map_to_user_util_1.mapToUserUtil)(foundUser);
        });
    }
};
