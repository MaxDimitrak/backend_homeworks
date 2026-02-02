"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogPaginatedListUtil = mapToBlogPaginatedListUtil;
const map_to_blog_util_1 = require("./map_to_blog.util");
function mapToBlogPaginatedListUtil(blogs, meta) {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: blogs.map(map_to_blog_util_1.blogMapper),
    };
}
