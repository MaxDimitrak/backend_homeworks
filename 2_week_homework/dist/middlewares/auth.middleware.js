"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const http_responses_1 = require("../core/types/http_responses");
const isAuthorized = (req, res, next) => {
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty';
    const authorization = req.get('authorization');
    if (!authorization) {
        res.sendStatus(http_responses_1.http_response.unauthorized);
        return;
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Basic') {
        res.sendStatus(http_responses_1.http_response.unauthorized);
        return;
    }
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(http_responses_1.http_response.unauthorized);
        return;
    }
    next();
};
exports.isAuthorized = isAuthorized;
