import {Response, Request} from "express";
import {db} from "../../db/init-db";
import {http_response} from "../../core/types/http_responses";
import {blogCollection} from "../../db/mongo.db";

export const deleteAllDataHandler = async (req: Request, res: Response): Promise<void> => {
    await blogCollection.deleteMany({})
    db.posts = [];
    res.sendStatus(http_response.no_content)
}