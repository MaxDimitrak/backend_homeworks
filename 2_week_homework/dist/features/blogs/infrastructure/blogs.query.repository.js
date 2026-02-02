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
exports.blogsQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../../db/mongo.db");
const map_to_blog_paginated_list_util_1 = require("../routes/mappers/map_to_blog_paginated_list.util");
const map_to_blog_util_1 = require("../routes/mappers/map_to_blog.util");
exports.blogsQueryRepository = {
    getManyBlogs(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, } = queryDto;
            const filter = {};
            if (searchNameTerm) {
                filter.name = { $regex: searchNameTerm, $options: 'i' };
            }
            const totalCount = yield mongo_db_1.blogCollection.countDocuments(filter);
            const skip = (pageNumber - 1) * pageSize;
            const items = yield mongo_db_1.blogCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            return (0, map_to_blog_paginated_list_util_1.mapToBlogPaginatedListUtil)(items, { pageNumber, pageSize, totalCount });
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield mongo_db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!foundBlog) {
                return null;
            }
            return (0, map_to_blog_util_1.blogMapper)(foundBlog);
        });
    },
};
