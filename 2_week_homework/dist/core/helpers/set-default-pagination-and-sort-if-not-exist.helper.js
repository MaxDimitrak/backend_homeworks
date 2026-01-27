"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultPaginationAndSortIfNotExist = setDefaultPaginationAndSortIfNotExist;
const query_pagination_ana_sorting_validation_middleware_1 = require("../../middlewares/query-pagination-ana-sorting.validation-middleware");
function setDefaultPaginationAndSortIfNotExist(query) {
    var _a;
    return Object.assign(Object.assign(Object.assign({}, query_pagination_ana_sorting_validation_middleware_1.paginationAndSortingByDefault), query), { sortBy: ((_a = query.sortBy) !== null && _a !== void 0 ? _a : query_pagination_ana_sorting_validation_middleware_1.paginationAndSortingByDefault.sortBy) });
}
