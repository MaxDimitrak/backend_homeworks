import {Request, Response, NextFunction} from 'express';
import {ValidationError, validationResult} from "express-validator";
import {http_response} from "../core/types/http_responses";
import {ErrorValidation} from "../core/types/validationError";
import {createErrorMessages} from "../core/utils/errors.util";

const formatErrors = (errors: ValidationError): ErrorValidation => ({
    message: errors.msg,
    field: errors.type === 'field' ? errors.path : errors.type
})

export const inputValidationResult = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors: ErrorValidation[] = validationResult(req).formatWith(formatErrors).array({onlyFirstError: true});
    if (errors.length) {
        res.status(http_response.bad_request).send(createErrorMessages(errors));
        return;
    }
    next();
}