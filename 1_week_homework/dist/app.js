"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const testing_router_1 = require("./testing/testing.router");
const http_responses_1 = require("./core/types/http_responses");
const videos_router_1 = require("./videos/router/videos.router");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        res.status(http_responses_1.httpResponse.ok).send("Videos API is running!");
    });
    app.use('/testing', testing_router_1.testingRouter);
    app.use('/videos', videos_router_1.videosRouter);
    return app;
};
exports.createApp = createApp;
