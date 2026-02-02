import {BlogDBType} from "../../domain/blog";
import {WithId} from "mongodb";
import {Blog_dataOutput} from "../output/blog_data.output";

export function blogMapper(blog: WithId<BlogDBType>): Blog_dataOutput {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}