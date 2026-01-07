import {Request, Response} from 'express';
import {BlogInputDto} from "../../dto/blog.input_dto";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";

export const updateBlogByIdHandler = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const body: BlogInputDto = req.body;
    if (!blogsRepository.getBlogById(id)){
        res.status(http_response.not_found).send({error: 'Blog not found'});
    }
    blogsRepository.updateBlogById(id, body);
    res.sendStatus(http_response.no_content)
}