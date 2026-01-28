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
exports.postsRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
exports.postsRepository = {
    getManyPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, } = query;
            console.log(`Sorting by ${sortBy} in ${sortDirection} mode`);
            const skip = (pageNumber - 1) * pageSize;
            const items = yield mongo_db_1.postCollection
                .find()
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            console.log('test');
            const totalCount = yield mongo_db_1.postCollection.countDocuments();
            return { items, totalCount };
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
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
            return { items, totalCount };
        });
    },
    createPost(createPostInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = Object.assign(Object.assign({}, createPostInput), { blogName: 'asterix', createdAt: new Date() });
            const insertedPost = yield mongo_db_1.postCollection.insertOne(newPost);
            return Object.assign(Object.assign({}, newPost), { _id: insertedPost.insertedId });
        });
    },
    updatePostById(id, updatePostInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.postCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: updatePostInput.title,
                    shortDescription: updatePostInput.shortDescription,
                    content: updatePostInput.content,
                    blogId: updatePostInput.blogId,
                }
            }, { returnDocument: 'after' });
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield mongo_db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return deletedPost.deletedCount === 1;
        });
    },
};
