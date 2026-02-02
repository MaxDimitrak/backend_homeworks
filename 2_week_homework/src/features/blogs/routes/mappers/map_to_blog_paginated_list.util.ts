import {WithId} from "mongodb";
import {BlogDBType} from "../../domain/blog";
import {BlogPaginatedDataOutput} from "../output/blog_paginated_data.output";
import {blogMapper} from "./map_to_blog.util";

export function mapToBlogPaginatedListUtil(
    blogs: WithId<BlogDBType>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number },
): BlogPaginatedDataOutput {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize:meta.pageSize,
        totalCount: meta.totalCount,
        items: blogs.map(blogMapper),
    }
}