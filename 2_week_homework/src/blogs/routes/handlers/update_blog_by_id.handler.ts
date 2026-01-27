import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {BlogDBType} from "../../domain/blog";
import {BlogUpdateDtoInput} from "../input/blog-update-dto.input";
import {blogsService} from "../../application/blogs.servise";

export const updateBlogByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const body: BlogUpdateDtoInput = req.body;
    const updatedBlog: WithId<BlogDBType> | null = await blogsService.updateBlogById(id, body);
    if (!updatedBlog) {
        res.sendStatus(http_response.not_found);
    }
    res.sendStatus(http_response.no_content)
}