import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {mapToPostUtil} from "./map_to_post.util";
import {PostPaginatedDataOutput} from "../output/post_paginated_data.output";

export function mapToPostPaginatedListUtil(
    posts: WithId<PostDBType>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number },
): PostPaginatedDataOutput {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: posts.map(mapToPostUtil)
    }
}