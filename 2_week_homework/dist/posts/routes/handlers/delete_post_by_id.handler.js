"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostByIdHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const posts_repository_1 = require("../../repositories/posts.repository");
const deletePostByIdHandler = (req, res) => {
    const id = req.params.id;
    const foundIndex = posts_repository_1.postsRepository.findPostIndex(id);
    if (foundIndex === -1) {
        res.status(http_responses_1.http_response.not_found).send("No blog found.");
        return;
    }
    posts_repository_1.postsRepository.deletePostById(foundIndex);
    res.sendStatus(http_responses_1.http_response.no_content);
};
exports.deletePostByIdHandler = deletePostByIdHandler;
