import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {WithId} from "mongodb";
import {Blog} from "../../types/blog";


export const getAllBlogsHandler = async (req: Request, res: Response): Promise<void> => {
    const data: WithId<Blog>[] = await blogsRepository.getAllBlogs();
    res.status(http_response.ok).send(data);
}