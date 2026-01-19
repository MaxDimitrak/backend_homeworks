import {BlogBDType, BlogViewModel} from "../../types/blog";
import {WithId} from "mongodb";

export const blogMapper = (blog: WithId<BlogBDType>): BlogViewModel => ({
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
})