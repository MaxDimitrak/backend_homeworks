import {Response} from 'express';
import {http_response} from "../types/http_responses";
import {DomainError} from "./domain.error";
import {BlogNotFoundError} from "./blog-repository-not-found.error";
import {PostNotFoundError} from "./post-repository-not-found.error";

export function errorHandler(error: unknown, res: Response): void {
    if (error instanceof BlogNotFoundError || error instanceof PostNotFoundError) {
        const httpStatus: http_response.not_found = http_response.not_found;
        const errorMessage = {
            errorMessage: {
                message: error.message,
                statusCode: httpStatus,
            }
        }
        res.status(httpStatus).send(errorMessage)
        return;
    }
    if (error instanceof DomainError) {
        const httpStatus: http_response.not_found = http_response.not_found;
        res.sendStatus(httpStatus)
        return;
    }
    res.sendStatus(http_response.internal_server_error);
    return;
}