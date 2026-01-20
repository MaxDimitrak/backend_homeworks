import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {WithId} from "mongodb";
import {BlogDBType, BlogViewModel} from "../../types/blog";
import {blogMapper} from "./blogMapper.handler";



export const getAllBlogsHandler = async (req: Request, res: Response): Promise<void> => {
    const data: WithId<BlogDBType>[] = await blogsRepository.getAllBlogs();
    const viewModel: BlogViewModel[] = data.map(blogMapper)
    res.status(http_response.ok).send(viewModel);
}