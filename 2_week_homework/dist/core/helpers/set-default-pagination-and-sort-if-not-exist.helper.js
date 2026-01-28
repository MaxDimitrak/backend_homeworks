"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultPaginationAndSortIfNotExist = setDefaultPaginationAndSortIfNotExist;
const query_pagination_ana_sorting_validation_middleware_1 = require("../../middlewares/query-pagination-ana-sorting.validation-middleware");
function setDefaultPaginationAndSortIfNotExist(query) {
    var _a, _b;
    return {
        pageNumber: query.pageNumber ? Number(query.pageNumber) : query_pagination_ana_sorting_validation_middleware_1.paginationAndSortingByDefault.pageNumber,
        pageSize: query.pageSize ? Number(query.pageSize) : query_pagination_ana_sorting_validation_middleware_1.paginationAndSortingByDefault.pageSize,
        sortBy: ((_a = query.sortBy) !== null && _a !== void 0 ? _a : query_pagination_ana_sorting_validation_middleware_1.paginationAndSortingByDefault.sortBy),
        sortDirection: (_b = query.sortDirection) !== null && _b !== void 0 ? _b : query_pagination_ana_sorting_validation_middleware_1.paginationAndSortingByDefault.sortDirection,
    };
}
