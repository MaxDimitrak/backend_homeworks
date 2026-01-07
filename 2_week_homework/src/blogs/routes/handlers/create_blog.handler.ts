import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input_dto";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";


export const createBlogHandler = (req: Request, res: Response): void => {
    const body: BlogInputDto = req.body;
    res.status(http_response.created).send(blogsRepository.createBlog(body));
}