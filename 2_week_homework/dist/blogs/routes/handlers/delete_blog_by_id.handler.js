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
exports.deleteBlogByIdHandler = void 0;
const http_responses_1 = require("../../../core/types/http_responses");
const blogs_repository_1 = require("../../repositories/blogs.repository");
const deleteBlogByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlogById(id);
    if (!isDeleted) {
        res.sendStatus(http_responses_1.http_response.not_found);
    }
    res.sendStatus(http_responses_1.http_response.no_content);
});
exports.deleteBlogByIdHandler = deleteBlogByIdHandler;
