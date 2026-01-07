"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogByIdHandler = void 0;
const blogs_repository_1 = require("../../repositories/blogs.repository");
const http_responses_1 = require("../../../core/types/http_responses");
const updateBlogByIdHandler = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (!blogs_repository_1.blogsRepository.getBlogById(id)) {
        res.status(http_responses_1.http_response.not_found).send({ error: 'Blog not found' });
    }
    blogs_repository_1.blogsRepository.updateBlogById(id, body);
    res.sendStatus(http_responses_1.http_response.no_content);
};
exports.updateBlogByIdHandler = updateBlogByIdHandler;
