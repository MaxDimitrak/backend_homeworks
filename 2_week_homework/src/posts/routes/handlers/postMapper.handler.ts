import {WithId} from "mongodb";
import {PostDBType, PostViewModel} from "../../types/post";

export const  postMapper = (post: WithId<PostDBType>): PostViewModel => ({
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt
})

