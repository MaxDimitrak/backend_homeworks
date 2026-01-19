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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const http_responses_1 = require("./core/types/http_responses");
const blogs_router_1 = require("./blogs/routes/blogs.router");
const paths_1 = require("./core/paths/paths");
const testing_router_1 = require("./testing/testing.router");
const posts_router_1 = require("./posts/routes/posts.router");
const mongo_db_1 = require("./db/mongo.db");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, mongo_db_1.runDB)();
            next();
        }
        catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }));
    app.get('/', (req, res) => {
        res.status(http_responses_1.http_response.ok).send("Blog_Platform API is running!");
    });
    app.use(paths_1.BLOGS_PATH, blogs_router_1.blogsRouter);
    app.use(paths_1.POSTS_PATH, posts_router_1.postsRouter);
    app.use(paths_1.TESTING_PATH, testing_router_1.testingRouter);
    return app;
};
exports.createApp = createApp;
