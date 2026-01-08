import {Post} from "../types/post";
import {db} from "../../db/init-db";
import {PostInputDto} from "../dto/post.input_dto";


export const postsRepository = {
    getAllPosts(): Post[] {
        return db.posts
    },
    getPostById(id: string): Post | undefined {
        return db.posts.find(p => p.id === id)
    },
    createPost(createPostInput: PostInputDto): Post {
        const newPost: Post = {
            ...createPostInput,
            id: db.posts.length ? String(db.posts[db.posts.length - 1].id + 1) : '1',
            blogName: 'asterix',
        }
        db.posts.push(newPost)
        return newPost;
    },
    updatePostById(id: string, updatePostInput: PostInputDto): void | undefined {
        const foundPost: Post = db.posts.find(p => p.id === id) as Post;
        foundPost.title = updatePostInput.title;
        foundPost.shortDescription = updatePostInput.shortDescription;
        foundPost.content = updatePostInput.content;
        foundPost.blogId = updatePostInput.blogId;
    },
    deletePostById(index: number): void {
        db.posts.splice(index, 1);
    },
    findPostIndex(id: string) {
        return db.posts.findIndex(p => p.id === id);
    }
}