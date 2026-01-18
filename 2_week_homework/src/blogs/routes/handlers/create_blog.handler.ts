import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input_dto";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {Blog} from "../../types/blog";


export const createBlogHandler = async (req: Request, res: Response): Promise<void> => {
    const body: BlogInputDto = req.body;
    const createdBlog: WithId<Blog>= await blogsRepository.createBlog(body);
    res.status(http_response.created).send(createdBlog);
}