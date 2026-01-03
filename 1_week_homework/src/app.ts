import express from "express";
import {testingRouter} from "./testing/testing.router";
import {httpResponse} from "./core/types/http_responses";
import {videosRouter} from "./videos/router/videos.router";

export const createApp = () => {
    const app = express();

    app.use(express.json());
    app.get("/", (req: express.Request, res: express.Response) => {
        res.status(httpResponse.ok).send("Hello World!");
    })
    app.use('/testing', testingRouter);
    app.use('/videos', videosRouter);

    return app;
}
