"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const http_responses_1 = require("./core/types/http_responses");
const blogs_router_1 = require("./features/blogs/routes/blogs.router");
const paths_1 = require("./core/paths/paths");
const testing_router_1 = require("./features/testing/testing.router");
const posts_router_1 = require("./features/posts/routes/posts.router");
const users_router_1 = require("./features/users/routes/users.router");
const auth_router_1 = require("./features/auth/routes/auth.router");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.status(http_responses_1.http_response.ok).send("Blog_Platform API is running!");
    });
    app.use(paths_1.BLOGS_PATH, blogs_router_1.blogsRouter);
    app.use(paths_1.POSTS_PATH, posts_router_1.postsRouter);
    app.use(paths_1.USERS_PATH, users_router_1.usersRouter);
    app.use(paths_1.AUTH_PATH, auth_router_1.authRouter);
    app.use(paths_1.TESTING_PATH, testing_router_1.testingRouter);
    return app;
};
exports.createApp = createApp;
