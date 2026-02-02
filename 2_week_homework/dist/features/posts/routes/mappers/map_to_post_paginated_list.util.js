"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostPaginatedListUtil = mapToPostPaginatedListUtil;
const map_to_post_util_1 = require("./map_to_post.util");
function mapToPostPaginatedListUtil(posts, meta) {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: posts.map(map_to_post_util_1.mapToPostUtil)
    };
}
