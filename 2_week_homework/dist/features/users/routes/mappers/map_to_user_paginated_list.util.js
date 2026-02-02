"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToUserPaginatedListUtil = mapToUserPaginatedListUtil;
const map_to_user_util_1 = require("./map_to_user.util");
function mapToUserPaginatedListUtil(users, meta) {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: users.map(map_to_user_util_1.mapToUserUtil),
    };
}
