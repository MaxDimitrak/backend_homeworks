import {Blog_dataOutput} from "./blog_data.output";

export type BlogPaginatedDataOutput = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Blog_dataOutput[];
};