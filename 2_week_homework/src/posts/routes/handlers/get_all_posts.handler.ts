import {Request, Response} from 'express';
import {http_response} from "../../../core/types/http_responses";
import {postsRepository} from "../../repositories/posts.repository";
import {PostDBType} from "../../types/post";
import {postMapper} from "./postMapper.handler";
import {WithId} from "mongodb";

export const getAllPostsHandler = async (req: Request, res: Response): Promise<void> => {
    const data: WithId<PostDBType>[] = await postsRepository.getAllPosts();
    res.status(http_response.ok).send(data.map(postMapper));
}