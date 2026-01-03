"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const videos_db_1 = require("../db/videos.db");
const http_responses_1 = require("../core/types/http_responses");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/all-data', (req, res) => {
    videos_db_1.videosDB.data = [];
    res.sendStatus(http_responses_1.httpResponse.no_content);
});
