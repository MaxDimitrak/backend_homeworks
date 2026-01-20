import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {PostDBType} from "../../types/post";
import {postsRepository} from "../../repositories/posts.repository";
import {WithId} from "mongodb";
import {postMapper} from "./postMapper.handler";

export const getPostByIdHandler = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const foundedPost: WithId<PostDBType> | null = await postsRepository.getPostById(id);
    if (!foundedPost) {
        res.sendStatus(http_response.not_found);
        return;
    }
    res.status(http_response.ok).send(postMapper(foundedPost));
}