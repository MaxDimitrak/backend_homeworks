"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogByIdHandler = void 0;
const blogs_repository_1 = require("../../repositories/blogs.repository");
const http_responses_1 = require("../../../core/types/http_responses");
const deleteBlogByIdHandler = (req, res) => {
    const id = req.params.id;
    if (!blogs_repository_1.blogsRepository.getBlogById(id)) {
        res.status(http_responses_1.http_response.not_found).send('No blog found');
        return;
    }
    blogs_repository_1.blogsRepository.deleteBlogById(id);
    res.sendStatus(http_responses_1.http_response.no_content);
};
exports.deleteBlogByIdHandler = deleteBlogByIdHandler;
