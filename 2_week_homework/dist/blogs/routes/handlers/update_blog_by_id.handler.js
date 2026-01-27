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
exports.updateBlogByIdHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const blogs_servise_1 = require("../../application/blogs.servise");
const updateBlogByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const updatedBlog = yield blogs_servise_1.blogsService.updateBlogById(id, body);
    if (!updatedBlog) {
        res.sendStatus(http_responses_1.http_response.not_found);
    }
    res.sendStatus(http_responses_1.http_response.no_content);
});
exports.updateBlogByIdHandler = updateBlogByIdHandler;
