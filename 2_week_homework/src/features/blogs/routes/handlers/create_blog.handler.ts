import {Request, Response} from "express";
import {http_response} from "../../../../core/types/http_responses";
import {blogsService} from "../../application/blogs.servise";
import {Blog_create_dtoInput} from "../input/blog_create_dto.input";
import {blogsQueryRepository} from "../../infrastructure/blogs.query.repository";
import {Blog_dataOutput} from "../output/blog_data.output";


export async function createBlogHandler(
    req: Request,
    res: Response
): Promise<void> {
    const body: Blog_create_dtoInput = req.body;
    const createdBlogId: string = await blogsService.createBlog(body);
    const createdBlog: Blog_dataOutput | null = await blogsQueryRepository.getBlogById(createdBlogId);
    if (!createdBlog) {
        res.sendStatus(http_response.internal_server_error);
        return;
    }
    res.status(http_response.created).send(createdBlog);
}