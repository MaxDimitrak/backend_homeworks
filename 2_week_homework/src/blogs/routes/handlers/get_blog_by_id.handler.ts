import {Request, Response} from "express";
import {Blog} from "../../types/blog";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";

export const getBlogByIdHandler = async (req: Request, res:Response) => {
    const id: string = req.params.id;
    const foundBlog: Blog | undefined = blogsRepository.getBlogById(id);
    if (!foundBlog) {
        res.status(http_response.not_found).send("Not found blog");
        return;
    }
    res.status(http_response.ok).send(foundBlog);
}