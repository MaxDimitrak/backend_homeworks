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
exports.getPostsByBlogIdHandler = getPostsByBlogIdHandler;
const errors_handler_1 = require("../../../core/errors/errors.handler");
const express_validator_1 = require("express-validator");
const set_default_pagination_and_sort_if_not_exist_helper_1 = require("../../../core/helpers/set-default-pagination-and-sort-if-not-exist.helper");
const posts_service_1 = require("../../application/posts.service");
const http_responses_1 = require("../../../core/types/http_responses");
const map_to_post_list_pagindted_util_1 = require("../mappers/map-to-post-list-pagindted.util");
function getPostsByBlogIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.blogId;
            const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
                locations: ['query'],
                includeOptionals: true,
            });
            const query = (0, set_default_pagination_and_sort_if_not_exist_helper_1.setDefaultPaginationAndSortIfNotExist)(sanitizedQuery);
            const viewModel = yield posts_service_1.postsService.getPostsByBlogId(id, query);
            res.status(http_responses_1.http_response.ok).send((0, map_to_post_list_pagindted_util_1.mapToPostListPaginatedUtil)(viewModel.items, {
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: viewModel.totalCount
            }));
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
