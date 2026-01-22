import express, {Express} from 'express'
import {http_response} from "./core/types/http_responses";
import {blogsRouter} from "./blogs/routes/blogs.router";
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "./core/paths/paths";
import {testingRouter} from "./testing/testing.router";
import {postsRouter} from "./posts/routes/posts.router";
import {runDB} from "./db/mongo.db";

export const createApp = () => {
    const app: Express = express();
    app.use(express.json());
    // app.use(async (req, res, next) => {
    //     try{
    //         await runDB()
    //         next()
    //     }catch(err){
    //         res.status(500).send("Internal Server Error");
    //     }
    // })
    app.get('/', (req, res) => {
        res.status(http_response.ok).send("Blog_Platform API is running!");
    })
    app.use(BLOGS_PATH, blogsRouter)
    app.use(POSTS_PATH, postsRouter)
    app.use(TESTING_PATH, testingRouter)
    return app;
}