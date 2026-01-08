"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const posts_repository_1 = require("../../repositories/posts.repository");
const createPostHandler = (req, res) => {
    const body = req.body;
    res.status(http_responses_1.http_response.created).send(posts_repository_1.postsRepository.createPost(body));
};
exports.createPostHandler = createPostHandler;
