import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {blogsRepository} from "../../repositories/blogs.repository";


export const deleteBlogByIdHandler = (req: Request, res: Response): void => {
    const id: string = req.params.id;
    const foundIndex = blogsRepository.findBlogIndex(id)
    if (foundIndex === -1) {
        res.status(http_response.not_found).send("No blog found.");
        return;
    }
    blogsRepository.deleteBlogById(foundIndex);
    res.sendStatus(http_response.no_content);
}