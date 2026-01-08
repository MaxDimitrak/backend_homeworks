"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogsHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const blogs_repository_1 = require("../../repositories/blogs.repository");
const getAllBlogsHandler = (req, res) => {
    res.status(http_responses_1.http_response.ok).send(blogs_repository_1.blogsRepository.getAllBlogs());
};
exports.getAllBlogsHandler = getAllBlogsHandler;
