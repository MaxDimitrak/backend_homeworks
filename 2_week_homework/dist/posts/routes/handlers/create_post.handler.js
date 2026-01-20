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
exports.createPostHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const posts_repository_1 = require("../../repositories/posts.repository");
const postMapper_handler_1 = require("./postMapper.handler");
const createPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdPost = yield posts_repository_1.postsRepository.createPost(body);
    res.status(http_responses_1.http_response.created).send((0, postMapper_handler_1.postMapper)(createdPost));
});
exports.createPostHandler = createPostHandler;
