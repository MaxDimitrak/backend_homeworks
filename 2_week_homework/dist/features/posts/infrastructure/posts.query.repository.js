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
exports.postsQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../../db/mongo.db");
const map_to_post_list_pagindted_util_1 = require("../routes/mappers/map-to-post-list-pagindted.util");
const map_to_post_util_1 = require("../routes/mappers/map-to-post.util");
exports.postsQueryRepository = {
    getManyPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, } = query;
            const skip = (pageNumber - 1) * pageSize;
            const items = yield mongo_db_1.postCollection
                .find()
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1, })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postCollection.countDocuments();
            return (0, map_to_post_list_pagindted_util_1.mapToPostListPaginatedUtil)(items, { pageNumber, pageSize, totalCount });
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundedPost = yield mongo_db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!foundedPost) {
                return null;
            }
            return (0, map_to_post_util_1.mapToPost)(foundedPost);
        });
    },
    getPostsByBlogId(blogId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, } = query;
            const skip = (pageNumber - 1) * pageSize;
            const totalCount = yield mongo_db_1.postCollection.countDocuments({ blogId: blogId });
            const items = yield mongo_db_1.postCollection
                .find({ blogId: blogId })
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            return (0, map_to_post_list_pagindted_util_1.mapToPostListPaginatedUtil)(items, { pageNumber, pageSize, totalCount });
        });
    },
};
