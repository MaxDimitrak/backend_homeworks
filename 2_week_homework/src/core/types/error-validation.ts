import {http_response} from "./http_responses";

export type ErrorValidationType = {
    status: http_response;
    detail: string;
    source?: string;
    code?: string;
}