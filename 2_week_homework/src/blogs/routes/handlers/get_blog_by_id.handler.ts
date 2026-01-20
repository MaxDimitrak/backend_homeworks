import {Request, Response} from "express";
import {BlogDBType} from "../../types/blog";
import {blogsRepository} from "../../repositories/blogs.repository";
import {http_response} from "../../../core/types/http_responses";
import {WithId} from "mongodb";
import {blogMapper} from "./blogMapper.handler";

export const getBlogByIdHandler = async (req: Request, res:Response): Promise<void> => {
    const id: string = req.params.id;
    const foundedBlog: WithId<BlogDBType> | null = await blogsRepository.getBlogById(id);
    if (!foundedBlog) {
        res.sendStatus(http_response.not_found);
        return;
    }
    res.status(http_response.ok).send(blogMapper(foundedBlog));
}