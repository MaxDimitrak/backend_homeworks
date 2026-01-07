"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const init_db_1 = require("../../db/init-db");
exports.blogsRepository = {
    getAll() {
        return init_db_1.db.blogs;
    },
    getBlogById(id) {
        return init_db_1.db.blogs.find(b => b.id === id);
    },
    createBlog(createBlogInput) {
        const newBlog = Object.assign(Object.assign({}, createBlogInput), { id: init_db_1.db.blogs.length ? String(init_db_1.db.blogs[init_db_1.db.blogs.length - 1].id + 1) : '1' });
        init_db_1.db.blogs.push(newBlog);
        return newBlog;
    },
    updateBlogById(id, updateBlogInput) {
        const foundBlog = init_db_1.db.blogs.find(b => b.id === id);
        foundBlog.name = updateBlogInput.name;
        foundBlog.description = updateBlogInput.description;
        foundBlog.websiteUrl = updateBlogInput.websiteUrl;
    },
    deleteBlogById(id) {
        init_db_1.db.blogs.filter(b => b.id !== id);
    }
};
