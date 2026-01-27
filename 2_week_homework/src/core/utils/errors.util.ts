import {ErrorsFields, ErrorValidationTypeOutput} from "../types/error-validation.dto";

export function createErrorMessages(
    errors: ErrorsFields[]
): ErrorValidationTypeOutput{
    return {
        errorsMessages: errors.map(error => ({
            message: error.message,
            field: error.field
        })),
    }
}