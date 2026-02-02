import {WithId} from "mongodb";
import {UserDBType} from "../../domain/user";
import {UserPaginatedDataOutput} from "../output/user_paginated_data.output";
import {mapToUserUtil} from "./map_to_user.util";

export function mapToUserPaginatedListUtil(
    users: WithId<UserDBType>[],
    meta: {pageNumber: number, pageSize: number, totalCount: number},
): UserPaginatedDataOutput {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: users.map(mapToUserUtil),
    }
}