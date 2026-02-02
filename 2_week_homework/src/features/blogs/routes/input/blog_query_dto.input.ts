import {PaginationAndSorting} from "../../../../core/types/pagination-and-sorting.type";
import {BlogSortFields} from "./blog_sort_fields";

export type SearchingTerm = {
    searchNameTerm?: string;
}

export type FilterFields = {
    name?: { $regex: string, $options: string };
}

export type BlogQueryDto = PaginationAndSorting<BlogSortFields> & SearchingTerm;