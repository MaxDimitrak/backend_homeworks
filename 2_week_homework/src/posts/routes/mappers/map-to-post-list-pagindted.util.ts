import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {mapToPost} from "./map-to-post.util";
import {PostDataPaginatedOutput} from "../output/post-data-paginated.output";

export function mapToPostListPaginatedUtil(
    posts: WithId<PostDBType>[],
    meta: {pageNumber: number, pageSize: number, totalCount: number},
):PostDataPaginatedOutput{
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: posts.map(mapToPost)
    }
}