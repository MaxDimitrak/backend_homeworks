import {blogCollection, postCollection} from "../../../db/mongo.db";
import {DeleteResult, InsertOneResult, ObjectId, UpdateResult, WithId} from "mongodb";
import {PostDBType} from "../domain/post";
import {PostCreateDtoInput} from "../routes/input/post-create.dto-input";
import {BlogDBType} from "../../blogs/domain/blog";
import {CreatePostForExactBlogInput} from "../../blogs/routes/input/create-post-for-exact-blog.dto.input";


export const postsRepository = {
    async createPost(createPostInput: PostCreateDtoInput): Promise<string> {
        const newPost: PostDBType = {
            ...createPostInput,
            blogName: `Blog${Math.random().toString(36).slice(2)}Name`,
            createdAt: new Date(),
        }
        const insertedPostId: InsertOneResult<PostDBType> = await postCollection.insertOne(newPost);
        return insertedPostId.insertedId.toString();
    },
    async createPostForExactBlog(blogId: string, dto: CreatePostForExactBlogInput): Promise<string | null> {
        const blog: WithId<BlogDBType> | null = await blogCollection.findOne({_id: new ObjectId(blogId)});
        if (!blog) {
            return null;
        }
        const newPost = {
            ...dto,
            createdAt: new Date(),
            blogId: blogId,
            blogName: blog.name
        };
        const createdPostId: InsertOneResult<PostDBType> = await postCollection.insertOne(newPost);
        return createdPostId.insertedId.toString();

    },
    async updatePostById(id: string, updatePostInput: PostCreateDtoInput): Promise<boolean> {
        const updatedPost: UpdateResult<PostDBType> = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set:
                    {
                        title: updatePostInput.title,
                        shortDescription: updatePostInput.shortDescription,
                        content: updatePostInput.content,
                        blogId: updatePostInput.blogId,
                    }
            },
        );
        return updatedPost.matchedCount === 1;
    },

    async deletePostById(id: string): Promise<boolean> {
        const deletedPost: DeleteResult = await postCollection.deleteOne({_id: new ObjectId(id)});
        return deletedPost.deletedCount === 1;
    },
}