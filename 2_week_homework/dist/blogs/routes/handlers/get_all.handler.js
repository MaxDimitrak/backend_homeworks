"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHAndler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const blogs_repository_1 = require("../../repositories/blogs.repository");
const getAllHAndler = (req, res) => {
    res.status(http_responses_1.http_response.ok).send(blogs_repository_1.blogsRepository.getAll());
};
exports.getAllHAndler = getAllHAndler;
