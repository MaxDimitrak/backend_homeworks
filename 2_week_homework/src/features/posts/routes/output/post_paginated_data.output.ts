import {PostDataOutput} from "./post_data.output";


export type PostPaginatedDataOutput = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: PostDataOutput[]
}