"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyPostsHandler = getManyPostsHandler;
const http_responses_1 = require("../../../core/types/http_responses");
const set_default_pagination_and_sort_if_not_exist_helper_1 = require("../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper");
const map_to_post_list_pagindted_util_1 = require("../mappers/map-to-post-list-pagindted.util");
const errors_handler_1 = require("../../../core/errors/errors.handler");
const posts_service_1 = require("../../application/posts.service");
function getManyPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = (0, set_default_pagination_and_sort_if_not_exist_helper_1.setDefaultPaginationAndSortIfNotExist)(req.query);
            const data = yield posts_service_1.postsService.getManyPosts(query);
            const viewModel = (0, map_to_post_list_pagindted_util_1.mapToPostListPaginatedUtil)(data.items, {
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: data.totalCount
            });
            res.status(http_responses_1.http_response.ok).send(viewModel);
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
