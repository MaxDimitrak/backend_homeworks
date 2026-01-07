"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const http_responses_1 = require("./core/types/http_responses");
const blogsRouter_1 = require("./blogs/routes/blogsRouter");
const paths_1 = require("./core/paths/paths");
const testing_router_1 = require("./testing/testing.router");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.status(http_responses_1.http_response.ok).send("Blog_Platform API is running!");
    });
    app.use(paths_1.BLOGS_PATH, blogsRouter_1.blogsRouter);
    app.use(paths_1.TESTING_PATH, testing_router_1.testingRouter);
    return app;
};
exports.createApp = createApp;
