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
exports.usersQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../../db/mongo.db");
exports.usersQueryRepository = {
    getManyUsers(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm } = queryDto;
            const searchConditions = [];
            if (searchLoginTerm) {
                searchConditions.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
            }
            if (searchEmailTerm) {
                searchConditions.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
            }
            let filter = {};
            if (searchConditions.length === 1) {
                filter = searchConditions[0];
            }
            else if (searchConditions.length > 1) {
                filter = { $or: searchConditions };
            }
            const totalCount = yield mongo_db_1.userCollection.countDocuments(filter);
            const skip = (pageNumber - 1) * pageSize;
            const users = yield mongo_db_1.userCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const meta = {
                pageNumber,
                pageSize,
                totalCount,
            };
            return { users, meta };
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.userCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
};
