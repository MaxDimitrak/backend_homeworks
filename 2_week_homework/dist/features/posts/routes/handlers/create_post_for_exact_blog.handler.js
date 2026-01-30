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
exports.createPostForExactBlogHandler = createPostForExactBlogHandler;
const errors_handler_1 = require("../../../../core/errors/errors.handler");
const http_responses_1 = require("../../../../core/types/http_responses");
const posts_service_1 = require("../../application/posts.service");
const posts_query_repository_1 = require("../../infrastructure/posts.query.repository");
function createPostForExactBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blogId = req.params.blogId;
            const dto = req.body;
            const createdPostId = yield posts_service_1.postsService.createPostForExactBlog(blogId, dto);
            if (!createdPostId) {
                res.sendStatus(http_responses_1.http_response.not_found);
                return;
            }
            const createdPost = yield posts_query_repository_1.postsQueryRepository.getPostById(createdPostId);
            if (!createdPost) {
                res.sendStatus(http_responses_1.http_response.internal_server_error);
                return;
            }
            res.status(http_responses_1.http_response.created).send(createdPost);
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
