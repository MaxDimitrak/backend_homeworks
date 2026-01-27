import {WithId} from "mongodb";
import {BlogDBType} from "../../domain/blog";
import {BlogDataPaginatedOutput} from "../output/blog-data-paginated.output";
import {blogMapper} from "./map-to-blog.util";

export function mapToBlogListPaginatedUtil(
    blogs: WithId<BlogDBType>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number },
): BlogDataPaginatedOutput {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize:meta.pageSize,
        totalCount: meta.totalCount,
        items: blogs.map(blogMapper),
    }
}