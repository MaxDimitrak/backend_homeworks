import {PaginationAndSorting} from "../types/pagination-and-sorting.type";
import {paginationAndSortingByDefault} from "../../middlewares/query-pagination-ana-sorting.validation-middleware";


export function setDefaultPaginationAndSortIfNotExist<P = string>(
    query: any
): PaginationAndSorting<P>{
    return {
        pageNumber: query.pageNumber ? Number(query.pageNumber) : paginationAndSortingByDefault.pageNumber,
        pageSize: query.pageSize ? Number(query.pageSize) : paginationAndSortingByDefault.pageSize,
        sortBy: (query.sortBy ?? paginationAndSortingByDefault.sortBy) as P,
        sortDirection: query.sortDirection ?? paginationAndSortingByDefault.sortDirection,
    }
}