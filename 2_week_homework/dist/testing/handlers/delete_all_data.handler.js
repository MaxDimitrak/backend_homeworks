"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllDataHandler = void 0;
const init_db_1 = require("../../db/init-db");
const http_responses_1 = require("../../core/types/http_responses");
const deleteAllDataHandler = (req, res) => {
    init_db_1.db.blogs = [];
    init_db_1.db.posts = [];
    res.sendStatus(http_responses_1.http_response.no_content);
};
exports.deleteAllDataHandler = deleteAllDataHandler;
