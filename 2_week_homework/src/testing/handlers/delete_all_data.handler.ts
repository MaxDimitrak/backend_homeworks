import {Response, Request} from "express";
import {db} from "../../db/init-db";
import {http_response} from "../../core/types/http_responses";

export const deleteAllDataHandler = (req: Request, res: Response) => {
    db.blogs = [];
    db.posts = [];
    res.sendStatus(http_response.no_content)
}