import {ErrorValidation} from "../types/validationError";

export const createErrorMessages = (
    errors: ErrorValidation[]
): { errorsMessages: ErrorValidation[] } => {
    return {errorsMessages: errors};
}