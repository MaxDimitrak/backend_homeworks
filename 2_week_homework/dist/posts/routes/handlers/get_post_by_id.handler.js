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
exports.getPostByIdHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const posts_repository_1 = require("../../repositories/posts.repository");
const getPostByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const foundPost = posts_repository_1.postsRepository.getPostById(id);
    if (!foundPost) {
        res.status(http_responses_1.http_response.not_found).send("Not found blog");
        return;
    }
    res.status(http_responses_1.http_response.ok).send(foundPost);
});
exports.getPostByIdHandler = getPostByIdHandler;
