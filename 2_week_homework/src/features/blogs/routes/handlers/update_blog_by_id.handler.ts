import {Request, Response} from 'express';
import {http_response} from "../../../../core/types/http_responses";
import {Blog_update_dtoInput} from "../input/blog_update_dto.input";
import {blogsService} from "../../application/blogs.servise";

export const updateBlogByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const body: Blog_update_dtoInput = req.body;
    const updatedBlog: boolean = await blogsService.updateBlogById(id, body);
    if (!updatedBlog) {
        res.sendStatus(http_response.not_found);
    }
    res.sendStatus(http_response.no_content)
}