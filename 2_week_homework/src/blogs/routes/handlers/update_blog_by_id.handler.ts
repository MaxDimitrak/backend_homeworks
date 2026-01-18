import {Request, Response} from 'express';
import {BlogInputDto} from "../../dto/blog.input_dto";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {Blog} from "../../types/blog";

export const updateBlogByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const body: BlogInputDto = req.body;
    const updatedBlog: WithId<Blog> | null = await blogsRepository.updateBlogById(id, body);
    if (!updatedBlog) {
        throw new Error('Blog not found.');
    }
    res.sendStatus(http_response.no_content)
}