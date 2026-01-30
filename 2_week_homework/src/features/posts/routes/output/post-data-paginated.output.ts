import {PostDataOutput} from "./post-data-output";


export type PostDataPaginatedOutput = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: PostDataOutput[]
}