import {Router} from "express";
import {videosDB} from "../db/videos.db";
import {httpResponse} from "../core/types/http_responses";

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req, res) => {
    videosDB.data = [];
    res.sendStatus(httpResponse.no_content);
})
