import {Request, Response} from "express";
import {http_response} from "../../../core/types/http_responses";
import {PostInputDto} from "../../dto/post.input_dto";
import {postsRepository} from "../../repositories/posts.repository";
import {WithId} from "mongodb";
import {PostDBType} from "../../types/post";
import {postMapper} from "./postMapper.handler";


export const createPostHandler = async (req: Request, res: Response): Promise<void> => {
    const body: PostInputDto = req.body;
    const createdPost: WithId<PostDBType> = await postsRepository.createPost(body);
    res.status(http_response.created).send(postMapper(createdPost));
}