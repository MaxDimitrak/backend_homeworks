import {PaginationAndSorting} from "../../../../core/types/pagination-and-sorting.type";
import {UserSortFields} from "./user_sort_fields";

export type UserSearchingTerm = {
    searchLoginTerm?: string;
    searchEmailTerm?: string;
}

export type UserQueryDto = PaginationAndSorting<UserSortFields> & UserSearchingTerm;