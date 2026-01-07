import express, {Express} from 'express'
import {http_response} from "./core/types/http_responses";

export const createApp = () => {
    const app: Express = express();
    app.use(express.json());
    app.get('/', (req, res) => {
        res.status(http_response.ok).send("Blog_Platform API is running!");
    })
    return app;
}