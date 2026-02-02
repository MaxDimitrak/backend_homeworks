import {Request, Response} from "express";
import {http_response} from "../../../../core/types/http_responses";
import {errorHandler} from "../../../../core/errors/errors.handler";
import {blogsService} from "../../application/blogs.servise";
import {Blog_dataOutput} from "../output/blog_data.output";

export async function getBlogByIdHandler(
    req: Request<{ id: string }>,
    res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const foundedBlog: Blog_dataOutput | null = await blogsService.getBlogById(id);
        if (!foundedBlog) {
            res.sendStatus(http_response.not_found)
            return;
        }
        res.status(http_response.ok).send(foundedBlog);
    } catch (err) {
        errorHandler(err, res);
    }
}