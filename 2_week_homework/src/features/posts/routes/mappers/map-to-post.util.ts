import {WithId} from "mongodb";
import {PostDBType} from "../../domain/post";
import {PostDataOutput} from "../output/post-data-output";

export function mapToPost(post: WithId<PostDBType>): PostDataOutput {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
    };
}