import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input_dto";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";
import {BlogViewModel} from "../../types/blog";
import {blogMapper} from "./blogMapper.handler";


export const createBlogHandler = async (req: Request, res: Response): Promise<void> => {
    const body: BlogInputDto = req.body;
    const createdBlog: BlogViewModel= await blogsRepository.createBlog(body);
    res.status(http_response.created).send(createdBlog);
}