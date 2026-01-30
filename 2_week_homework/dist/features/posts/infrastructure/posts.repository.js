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
const mongo_db_1 = require("../../../db/mongo.db");
const mongodb_1 = require("mongodb");
exports.postsRepository = {
    createPost(createPostInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = Object.assign(Object.assign({}, createPostInput), { blogName: `Blog${Math.random().toString(36).slice(2)}Name`, createdAt: new Date() });
            const insertedPostId = yield mongo_db_1.postCollection.insertOne(newPost);
            return insertedPostId.insertedId.toString();
        });
    },
    createPostForExactBlog(blogId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(blogId) });
            if (!blog) {
                return null;
            }
            const newPost = Object.assign(Object.assign({}, dto), { createdAt: new Date(), blogId: blogId, blogName: blog.name });
            const createdPostId = yield mongo_db_1.postCollection.insertOne(newPost);
            return createdPostId.insertedId.toString();
        });
    },
    updatePostById(id, updatePostInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield mongo_db_1.postCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: updatePostInput.title,
                    shortDescription: updatePostInput.shortDescription,
                    content: updatePostInput.content,
                    blogId: updatePostInput.blogId,
                }
            });
            return updatedPost.matchedCount === 1;
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield mongo_db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return deletedPost.deletedCount === 1;
        });
    },
};
