"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostsHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const posts_repository_1 = require("../../repositories/posts.repository");
const getAllPostsHandler = (req, res) => {
    res.status(http_responses_1.http_response.ok).send(posts_repository_1.postsRepository.getAllPosts());
};
exports.getAllPostsHandler = getAllPostsHandler;
