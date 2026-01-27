import {PaginationAndSorting} from "../../../core/types/pagination-and-sorting.type";
import {BlogSortFields} from "./blog-sort-fields";

export type SearchingTerm = Partial<{
    searchNameTerm: string;
}>

export type FilterFields = {
    name?: {$regex: string, $options: string};
}

export type BlogQueryDto = PaginationAndSorting<BlogSortFields> & SearchingTerm;