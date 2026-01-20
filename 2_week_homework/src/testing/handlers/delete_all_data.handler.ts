import {Response, Request} from "express";
import {http_response} from "../../core/types/http_responses";
import {blogCollection, postCollection} from "../../db/mongo.db";

export const deleteAllDataHandler = async (req: Request, res: Response): Promise<void> => {
    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    res.sendStatus(http_response.no_content)
}