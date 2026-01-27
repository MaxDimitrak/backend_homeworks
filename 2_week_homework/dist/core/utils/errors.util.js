"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorMessages = createErrorMessages;
function createErrorMessages(errors) {
    return {
        errorsMessages: errors.map(error => ({
            message: error.message,
            field: error.field
        })),
    };
}
