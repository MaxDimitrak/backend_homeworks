import express, {Express, Request, Response} from "express";
import {testingRouter} from "./testing/testing.router";
import {httpResponse} from "./core/types/http_responses";
import {videosRouter} from "./videos/router/videos.router";

export const createApp = () => {
    const app: Express = express();

    app.use(express.json());
    app.get("/", (req: Request, res: Response) => {
        res.status(httpResponse.ok).send("Videos API is running!");
    })
    app.use('/testing', testingRouter);
    app.use('/videos', videosRouter);

    return app;
}
