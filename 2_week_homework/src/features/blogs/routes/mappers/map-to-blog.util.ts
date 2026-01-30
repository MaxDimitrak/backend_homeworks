import {BlogDBType} from "../../domain/blog";
import {WithId} from "mongodb";
import {BlogDataOutput} from "../output/blog-data-output";

export function blogMapper(blog: WithId<BlogDBType>): BlogDataOutput {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}