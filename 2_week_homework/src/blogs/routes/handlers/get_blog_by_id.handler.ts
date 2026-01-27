import {Request, Response} from "express";
import {BlogDBType} from "../../domain/blog";
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {blogMapper} from "../mappers/map-to-blog.util";
import {errorHandler} from "../../../core/errors/errors.handler";
import {blogsService} from "../../application/blogs.servise";

export async function getBlogByIdHandler(
    req: Request<{id: string}>,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const foundedBlog: WithId<BlogDBType> | null = await blogsService.getBlogById(id);
        if (!foundedBlog) {
            res.sendStatus(http_response.not_found)
            return;
        }
        res.status(http_response.ok).send(blogMapper(foundedBlog));
    } catch (err) {
        errorHandler(err, res);
    }
}