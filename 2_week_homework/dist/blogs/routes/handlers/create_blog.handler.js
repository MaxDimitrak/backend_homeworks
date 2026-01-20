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
exports.createBlogHandler = void 0;
const blogs_repository_1 = require("../../repositories/blogs.repository");
const http_responses_1 = require("../../../core/types/http_responses");
const blogMapper_handler_1 = require("./blogMapper.handler");
const createBlogHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdBlog = yield blogs_repository_1.blogsRepository.createBlog(body);
    res.status(http_responses_1.http_response.created).send((0, blogMapper_handler_1.blogMapper)(createdBlog));
});
exports.createBlogHandler = createBlogHandler;
