import express, {Express} from 'express'
import {http_response} from "./core/types/http_responses";
import {blogsRouter} from "./features/blogs/routes/blogs.router";
import {AUTH_PATH, BLOGS_PATH, POSTS_PATH, TESTING_PATH, USERS_PATH} from "./core/paths/paths";
import {testingRouter} from "./features/testing/testing.router";
import {postsRouter} from "./features/posts/routes/posts.router";
import {usersRouter} from "./features/users/routes/users.router";
import {authRouter} from "./features/auth/routes/auth.router";

export const createApp = () => {
    const app: Express = express();
    app.use(express.json());
    app.get('/', (req, res) => {
        res.status(http_response.ok).send("Blog_Platform API is running!");
    })
    app.use(BLOGS_PATH, blogsRouter)
    app.use(POSTS_PATH, postsRouter)
    app.use(USERS_PATH, usersRouter)
    app.use(AUTH_PATH, authRouter)
    app.use(TESTING_PATH, testingRouter)
    return app;
}