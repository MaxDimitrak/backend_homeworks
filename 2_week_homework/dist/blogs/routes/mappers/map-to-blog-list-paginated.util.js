"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogListPaginatedUtil = mapToBlogListPaginatedUtil;
const map_to_blog_util_1 = require("./map-to-blog.util");
function mapToBlogListPaginatedUtil(blogs, meta) {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: blogs.map(map_to_blog_util_1.blogMapper),
    };
}
