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
exports.usersRepository = void 0;
const mongo_db_1 = require("../../../db/mongo.db");
const mongodb_1 = require("mongodb");
exports.usersRepository = {
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                login: dto.login,
                email: dto.email,
                password: dto.password,
                createdAt: new Date(),
            };
            const createdUser = yield mongo_db_1.userCollection.insertOne(newUser);
            return createdUser.insertedId.toString();
        });
    },
    findUserByEmailOrLogin(searchParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundedUser = yield mongo_db_1.userCollection.findOne({
                $or: [{ email: searchParam }, { login: searchParam }]
            });
            if (!foundedUser) {
                return null;
            }
            const foundedField = foundedUser.email === searchParam ? 'email' : 'login';
            return { user: foundedUser, matchedField: foundedField };
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.userCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield mongo_db_1.userCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return deletedUser.deletedCount === 1;
        });
    }
};
