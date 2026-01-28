"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationAndSortingByDefault = void 0;
exports.paginationAnaSortingValidation = paginationAnaSortingValidation;
const express_validator_1 = require("express-validator");
const sort_direction_1 = require("../core/types/sort-direction");
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_DIRECTION = sort_direction_1.SortDirection.Desc;
exports.paginationAndSortingByDefault = {
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    sortDirection: DEFAULT_SORT_DIRECTION
};
function paginationAnaSortingValidation(sortFieldEnum) {
    const allowedSortFields = Object.values(sortFieldEnum);
    return [
        (0, express_validator_1.query)('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .toInt()
            .isInt({ min: 1 })
            .withMessage('pageNumber must be a positive integer'),
        (0, express_validator_1.query)('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .toInt()
            .isInt({ min: 1, max: 100 })
            .withMessage('pageSize must be a positive integer between 1 and 100'),
        (0, express_validator_1.query)('sortBy')
            .default(Object.values(sortFieldEnum)[0])
            .isIn(allowedSortFields)
            .withMessage(`Invalid sort field. Allowed values are ${allowedSortFields.join(',')}`),
        (0, express_validator_1.query)('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(sort_direction_1.SortDirection))
            .withMessage(`Invalid sort direction. Allowed values are ${sort_direction_1.SortDirection}`)
    ];
}
