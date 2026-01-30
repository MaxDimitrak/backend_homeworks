import {Request, Response} from "express";
import {http_response} from "../../../../core/types/http_responses";
import {blogsService} from "../../application/blogs.servise";
import {BlogCreateDtoInput} from "../input/blog-create-dto.input";
import {blogsQueryRepository} from "../../infrastructure/blogs.query.repository";
import {BlogDataOutput} from "../output/blog-data-output";


export async function createBlogHandler(
    req: Request,
    res: Response
): Promise<void> {
    const body: BlogCreateDtoInput = req.body;
    const createdBlogId: string = await blogsService.createBlog(body);
    const createdBlog: BlogDataOutput | null = await blogsQueryRepository.getBlogById(createdBlogId);
    if (!createdBlog) {
        res.sendStatus(http_response.internal_server_error);
        return;
    }
    res.status(http_response.created).send(createdBlog);
}