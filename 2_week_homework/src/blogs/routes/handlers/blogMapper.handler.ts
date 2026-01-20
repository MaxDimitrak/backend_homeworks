import {BlogDBType, BlogViewModel} from "../../types/blog";
import {WithId} from "mongodb";

export const blogMapper = (blog: WithId<BlogDBType>): BlogViewModel => ({
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
})