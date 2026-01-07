import express, {Express} from 'express'
import {http_response} from "./core/types/http_responses";
import {blogsRouter} from "./blogs/routes/blogsRouter";
import {BLOGS_PATH, TESTING_PATH} from "./core/paths/paths";
import {testingRouter} from "./testing/testing.router";

export const createApp = () => {
    const app: Express = express();
    app.use(express.json());
    app.get('/', (req, res) => {
        res.status(http_response.ok).send("Blog_Platform API is running!");
    })
    app.use(BLOGS_PATH, blogsRouter)

    app.use(TESTING_PATH, testingRouter)
    return app;
}