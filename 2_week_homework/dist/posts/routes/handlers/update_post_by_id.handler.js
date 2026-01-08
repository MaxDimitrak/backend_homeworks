"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostByIdHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const posts_repository_1 = require("../../repositories/posts.repository");
const updatePostByIdHandler = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (!posts_repository_1.postsRepository.getPostById(id)) {
        res.status(http_responses_1.http_response.not_found).send({ error: 'Blog not found' });
    }
    posts_repository_1.postsRepository.updatePostById(id, body);
    res.sendStatus(http_responses_1.http_response.no_content);
};
exports.updatePostByIdHandler = updatePostByIdHandler;
