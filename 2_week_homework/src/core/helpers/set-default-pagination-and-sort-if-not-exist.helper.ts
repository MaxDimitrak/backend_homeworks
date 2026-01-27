import {PaginationAndSorting} from "../types/pagination-and-sorting.type";
import {paginationAndSortingByDefault} from "../../middlewares/query-pagination-ana-sorting.validation-middleware";


export function setDefaultPaginationAndSortIfNotExist<P = string>(
    query: Partial<PaginationAndSorting<P>>
): PaginationAndSorting<P>{
    return {
        ...paginationAndSortingByDefault,
        ...query,
        sortBy: (query.sortBy ?? paginationAndSortingByDefault.sortBy) as P,
    }
}