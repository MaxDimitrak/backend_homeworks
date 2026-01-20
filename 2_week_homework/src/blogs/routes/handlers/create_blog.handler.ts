import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input_dto";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";
import {BlogDBType} from "../../types/blog";
import {blogMapper} from "./blogMapper.handler";
import {WithId} from "mongodb";


export const createBlogHandler = async (req: Request, res: Response): Promise<void> => {
    const body: BlogInputDto = req.body;
    const createdBlog: WithId<BlogDBType>= await blogsRepository.createBlog(body);
    res.status(http_response.created).send(blogMapper(createdBlog));
}