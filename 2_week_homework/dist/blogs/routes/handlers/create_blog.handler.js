"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogHandler = void 0;
const blogs_repository_1 = require("../../repositories/blogs.repository");
const http_responses_1 = require("../../../core/types/http_responses");
const createBlogHandler = (req, res) => {
    const body = req.body;
    res.status(http_responses_1.http_response.created).send(blogs_repository_1.blogsRepository.createBlog(body));
};
exports.createBlogHandler = createBlogHandler;
