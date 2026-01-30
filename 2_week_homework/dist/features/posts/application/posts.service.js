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
exports.postsService = void 0;
const posts_repository_1 = require("../infrastructure/posts.repository");
const posts_query_repository_1 = require("../infrastructure/posts.query.repository");
exports.postsService = {
    getManyPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_query_repository_1.postsQueryRepository.getManyPosts(query);
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_query_repository_1.postsQueryRepository.getPostById(id);
        });
    },
    createPost(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.createPost(dto);
        });
    },
    updatePostById(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.updatePostById(id, dto);
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.deletePostById(id);
        });
    },
    getPostsByBlogId(blogId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_query_repository_1.postsQueryRepository.getPostsByBlogId(blogId, query);
        });
    },
    createPostForExactBlog(blogId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.createPostForExactBlog(blogId, dto);
        });
    },
};
