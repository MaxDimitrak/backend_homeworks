import {Request, Response} from "express";
import {errorHandler} from "../../../core/errors/errors.handler";
import {WithId} from "mongodb";
import {PostDBType} from "../../../posts/domain/post";
import {blogsService} from "../../application/blogs.servise";
import {http_response} from "../../../core/types/http_responses";
import {mapToPost} from "../../../posts/routes/mappers/map-to-post.util";
import {CreatePostForExactBlogInput} from "../input/create-post-for-exact-blog.dto.input";

export async function createPostForExactBlogHandler(
    req: Request,
    res: Response): Promise<void> {
    try{
        const blogId: string = req.params.blogId;
        const dto: CreatePostForExactBlogInput = req.body;
        const createdPost: WithId<PostDBType> | null = await blogsService.createPostForExactBlog(blogId, dto);
        if (!createdPost) {
            res.sendStatus(http_response.not_found);
            return;
        }
        res.status(http_response.ok).send(mapToPost(createdPost))
    }catch(err){
        errorHandler(err, res);
    }
}