import {Request, Response, Router} from "express";
import {videosDB} from "../db/videos.db";
import {httpResponse} from "../core/types/http_responses";

export const testingRouter: Router = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videosDB.data = [];
    res.sendStatus(httpResponse.no_content);
})
