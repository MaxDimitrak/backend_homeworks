"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http_response = void 0;
var http_response;
(function (http_response) {
    http_response[http_response["ok"] = 200] = "ok";
    http_response[http_response["created"] = 201] = "created";
    http_response[http_response["no_content"] = 204] = "no_content";
    http_response[http_response["bad_request"] = 400] = "bad_request";
    http_response[http_response["unauthorized"] = 401] = "unauthorized";
    http_response[http_response["not_found"] = 404] = "not_found";
    http_response[http_response["internal_server_error"] = 500] = "internal_server_error";
})(http_response || (exports.http_response = http_response = {}));
