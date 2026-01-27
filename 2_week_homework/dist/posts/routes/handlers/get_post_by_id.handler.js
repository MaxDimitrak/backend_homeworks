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
exports.getPostByIdHandler = getPostByIdHandler;
const http_responses_1 = require("../../../core/types/http_responses");
const map_to_post_util_1 = require("../mappers/map-to-post.util");
const errors_handler_1 = require("../../../core/errors/errors.handler");
const posts_service_1 = require("../../application/posts.service");
function getPostByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const foundedPost = yield posts_service_1.postsService.getPostById(id);
            if (!foundedPost) {
                res.sendStatus(http_responses_1.http_response.not_found);
                return;
            }
            res.status(http_responses_1.http_response.ok).send((0, map_to_post_util_1.mapToPost)(foundedPost));
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
