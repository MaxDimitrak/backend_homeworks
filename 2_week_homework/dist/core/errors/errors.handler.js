"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const http_responses_1 = require("../types/http_responses");
const domain_error_1 = require("./domain.error");
const blog_repository_not_found_error_1 = require("./blog-repository-not-found.error");
const post_repository_not_found_error_1 = require("./post-repository-not-found.error");
function errorHandler(error, res) {
    if (error instanceof blog_repository_not_found_error_1.BlogNotFoundError || error instanceof post_repository_not_found_error_1.PostNotFoundError) {
        const httpStatus = http_responses_1.http_response.not_found;
        const errorMessage = {
            errorMessage: {
                message: error.message,
                statusCode: httpStatus,
            }
        };
        res.status(httpStatus).send(errorMessage);
        return;
    }
    if (error instanceof domain_error_1.DomainError) {
        const httpStatus = http_responses_1.http_response.not_found;
        res.sendStatus(httpStatus);
        return;
    }
    res.sendStatus(http_responses_1.http_response.internal_server_error);
    return;
}
