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
exports.updatePostByIdHandler = updatePostByIdHandler;
const http_responses_1 = require("../../../core/types/http_responses");
const errors_handler_1 = require("../../../core/errors/errors.handler");
const posts_service_1 = require("../../application/posts.service");
function updatePostByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedPost = yield posts_service_1.postsService.updatePostById(id, body);
            if (!updatedPost) {
                res.sendStatus(http_responses_1.http_response.not_found);
                return;
            }
            res.sendStatus(http_responses_1.http_response.no_content);
        }
        catch (err) {
            (0, errors_handler_1.errorHandler)(err, res);
        }
    });
}
