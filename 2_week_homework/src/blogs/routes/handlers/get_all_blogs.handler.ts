import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {blogsRepository} from "../../repositories/blogs.repository";


export const getAllBlogsHandler = (req: Request, res: Response) => {
    res.status(http_response.ok).send(blogsRepository.getAllBlogs());
}