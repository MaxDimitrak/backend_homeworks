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
exports.deleteAllDataHandler = void 0;
const init_db_1 = require("../../db/init-db");
const http_responses_1 = require("../../core/types/http_responses");
const mongo_db_1 = require("../../db/mongo.db");
const deleteAllDataHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongo_db_1.blogCollection.deleteMany({});
    init_db_1.db.posts = [];
    res.sendStatus(http_responses_1.http_response.no_content);
});
exports.deleteAllDataHandler = deleteAllDataHandler;
