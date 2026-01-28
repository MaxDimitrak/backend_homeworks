import {query, ValidationChain} from "express-validator";
import {SortDirection} from "../core/types/sort-direction";

const DEFAULT_PAGE_NUMBER: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;
const DEFAULT_SORT_BY: string = 'createdAt';
const DEFAULT_SORT_DIRECTION: SortDirection.Desc = SortDirection.Desc

export const paginationAndSortingByDefault = {
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    sortDirection: DEFAULT_SORT_DIRECTION
}

export function paginationAnaSortingValidation<T extends string>(sortFieldEnum: Record<string, T>): ValidationChain[] {
    const allowedSortFields: T[] = Object.values(sortFieldEnum);
    return [
        query('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .toInt()
            .isInt({min: 1})
            .withMessage('pageNumber must be a positive integer')
        ,

        query('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .toInt()
            .isInt({min: 1, max: 100})
            .withMessage('pageSize must be a positive integer between 1 and 100'),

        query('sortBy')
            .default(Object.values(sortFieldEnum)[0])
            .isIn(allowedSortFields)
            .withMessage(`Invalid sort field. Allowed values are ${allowedSortFields.join(',')}`),

        query('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(SortDirection))
            .withMessage(`Invalid sort direction. Allowed values are ${SortDirection}`)
    ]
}