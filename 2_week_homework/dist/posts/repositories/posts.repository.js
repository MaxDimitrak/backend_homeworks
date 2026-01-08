"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const init_db_1 = require("../../db/init-db");
exports.postsRepository = {
    getAllPosts() {
        return init_db_1.db.posts;
    },
    getPostById(id) {
        return init_db_1.db.posts.find(p => p.id === id);
    },
    createPost(createPostInput) {
        const newPost = Object.assign(Object.assign({}, createPostInput), { id: init_db_1.db.posts.length ? String(init_db_1.db.posts[init_db_1.db.posts.length - 1].id + 1) : '1', blogName: 'asterix' });
        init_db_1.db.posts.push(newPost);
        return newPost;
    },
    updatePostById(id, updatePostInput) {
        const foundPost = init_db_1.db.posts.find(p => p.id === id);
        foundPost.title = updatePostInput.title;
        foundPost.shortDescription = updatePostInput.shortDescription;
        foundPost.content = updatePostInput.content;
        foundPost.blogId = updatePostInput.blogId;
    },
    deletePostById(index) {
        init_db_1.db.posts.splice(index, 1);
    },
    findPostIndex(id) {
        return init_db_1.db.posts.findIndex(p => p.id === id);
    }
};
