"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = void 0;
var httpResponse;
(function (httpResponse) {
    httpResponse[httpResponse["ok"] = 200] = "ok";
    httpResponse[httpResponse["created"] = 201] = "created";
    httpResponse[httpResponse["no_content"] = 204] = "no_content";
    httpResponse[httpResponse["bad_request"] = 400] = "bad_request";
    httpResponse[httpResponse["not_found"] = 404] = "not_found";
    httpResponse[httpResponse["internal_server_error"] = 500] = "internal_server_error";
})(httpResponse || (exports.httpResponse = httpResponse = {}));
