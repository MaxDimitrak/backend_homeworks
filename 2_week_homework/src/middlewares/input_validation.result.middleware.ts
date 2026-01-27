import {Request, Response, NextFunction} from 'express';
import {ValidationError, validationResult} from "express-validator";
import {http_response} from "../core/types/http_responses";
import {ErrorsFields, ErrorValidationTypeOutput} from "../core/types/error-validation.dto";
import {createErrorMessages} from "../core/utils/errors.util";

const formatErrors = (errors: ValidationError): ErrorsFields => ({
        message: errors.msg,
        field: errors.type === 'field' ? errors.path : errors.type
})

export const inputValidationResult = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors: ErrorsFields[] = validationResult(req).formatWith(formatErrors).array({onlyFirstError: true});
    if (errors.length) {
        res.status(http_response.bad_request).send(createErrorMessages(errors));
        return;
    }
    next();
}