import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {blogsService} from "../../application/blogs.servise";


export const deleteBlogByIdHandler =async  (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const isDeleted: boolean = await blogsService.deleteBlogById(id);
    if (!isDeleted) {
        res.sendStatus(http_response.not_found);
        return;
    }
    res.sendStatus(http_response.no_content);
}