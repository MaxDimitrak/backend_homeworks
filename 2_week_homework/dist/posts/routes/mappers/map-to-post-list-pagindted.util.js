"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPostListPaginatedUtil = mapToPostListPaginatedUtil;
const map_to_post_util_1 = require("./map-to-post.util");
function mapToPostListPaginatedUtil(posts, meta) {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: posts.map(map_to_post_util_1.mapToPost)
    };
}
