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
exports.createPostForExactBlogHandler = createPostForExactBlogHandler;
const errors_handler_1 = require("../../../core/errors/errors.handler");
const blogs_servise_1 = require("../../application/blogs.servise");
const http_responses_1 = require("../../../core/types/http_responses");
const map_to_post_util_1 = require("../../../posts/routes/mappers/map-to-post.util");
function createPostForExactBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blogId = req.params.blogId;
            const dto = req.body;
            const createdPost = yield blogs_servise_1.blogsService.createPostForExactBlog(blogId, dto);
            if (!createdPost) {
                res.sendStatus(http_responses_1.http_response.not_found);
                return;
            }
            res.status(http_responses_1.http_response.ok).send((0, map_to_post_util_1.mapToPost)(createdPost));
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
