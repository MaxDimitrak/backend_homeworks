"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToUserUtil = mapToUserUtil;
function mapToUserUtil(user) {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    };
}
