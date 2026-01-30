import {BlogDataOutput} from "./blog-data-output";

export type BlogDataPaginatedOutput = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: BlogDataOutput[];
};