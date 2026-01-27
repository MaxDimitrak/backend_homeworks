export type ErrorsFields = {
    message: string;
    field: string;
}

export type ErrorValidationTypeOutput = {
    errorsMessages: ErrorsFields[];
}