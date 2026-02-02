import {UserDataOutput} from "./user_data.output";

export type UserPaginatedDataOutput = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserDataOutput[]
}