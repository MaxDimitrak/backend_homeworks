import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {BlogDBType} from "../../domain/blog";
import {blogMapper} from "../mappers/map-to-blog.util";
import {WithId} from "mongodb";
import {blogsService} from "../../application/blogs.servise";
import {BlogCreateDtoInput} from "../input/blog-create-dto.input";


export async function createBlogHandler(
    req: Request,
    res: Response
): Promise<void> {
    const body: BlogCreateDtoInput = req.body;
    const createdBlog: WithId<BlogDBType> = await blogsService.createBlog(body);
    res.status(http_response.created).send(blogMapper(createdBlog));
}