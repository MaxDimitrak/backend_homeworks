import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";


export const deleteBlogByIdHandler = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    if (!blogsRepository.getBlogById(id)) {
        res.status(http_response.not_found).send('No blog found');
        return;
    }
    blogsRepository.deleteBlogById(id);
    res.sendStatus(http_response.no_content);
}