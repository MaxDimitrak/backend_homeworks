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
exports.blogsRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
exports.blogsRepository = {
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.find().toArray();
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    createBlog(createBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, createBlogInput), { createdAt: new Date(), isMembership: false });
            const insertedBlog = yield mongo_db_1.blogCollection.insertOne(newBlog);
            return Object.assign(Object.assign({}, newBlog), { _id: insertedBlog.insertedId });
        });
    },
    updateBlogById(id, updateBlogInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.blogCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: updateBlogInput.name,
                    description: updateBlogInput.description,
                    websiteUrl: updateBlogInput.websiteUrl,
                }
            }, { returnDocument: 'after' });
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield mongo_db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (!deletedBlog.deletedCount) {
                throw new Error("Blog not found.");
            }
            return;
        });
    },
};
