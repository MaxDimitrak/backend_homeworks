import {Express} from "express";
import {createApp} from "../../src/app";
import request from "supertest";
import {http_response} from "../../src/core/types/http_responses";
import {runDB} from "../../src/db/mongo.db";
import {PostCreateDtoInput} from "../../src/posts/routes/input/post-create.dto-input";


describe('testing posts page', () => {
    const app: Express = createApp();
    const credentials: string = Buffer.from('admin:qwerty').toString('base64');

    const testPostInputData: PostCreateDtoInput = {
        title: 'test',
        shortDescription: 'short description test',
        content: 'content test',
        blogId: '1'
    }


    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(http_response.no_content);
        await runDB();
    })

    it('should get all posts', async () => {
        await request(app).get('/posts').expect(http_response.ok)
    })

    it('should create a post and then return it', async () => {
        const postResponse = await request(app)
            .post('/posts')
            .set('authorization', `Basic ${credentials}`)
            .send(
                {
                    ...testPostInputData,
                    title: 'test 1'
                }
            )
            .expect(http_response.created);
        const getResponse = await request(app).get(`/posts/${postResponse.body.id}`).expect(http_response.ok);
        expect(getResponse.body).toEqual({
            ...postResponse.body,
            id: expect.any(String),
            blogName: expect.any(String),
        })
    })
    it('should update a post and return it', async () => {
        const postResponse = await request(app)
            .post('/posts')
            .set('authorization', `Basic ${credentials}`)
            .send(
                {
                    ...testPostInputData,
                    title: 'test 2'
                }
            )
            .expect(http_response.created);
        const putResponse = await request(app)
            .put(`/posts/${postResponse.body.id}`)
            .set('authorization', `Basic ${credentials}`)
            .send({
                ...testPostInputData,
                title: 'test 2 updated',
                shortDescription: 'short description updated',
                content: 'content updated',
                blogId: '1 updated',
            })
            .expect(http_response.no_content);
        const getResponse = await request(app).get(`/posts/${postResponse.body.id}`).expect(http_response.ok);
        expect(getResponse.body).toEqual({
            title: 'test 2 updated',
            shortDescription: 'short description updated',
            content: 'content updated',
            blogId: '1 updated',
            id: expect.any(String),
            blogName: expect.any(String),
            createdAt: expect.any(String),
        })
    })
    it('should delete a post and return not found', async () => {
        const postResponse = await request(app)
            .post('/posts')
            .set('authorization', `Basic ${credentials}`)
            .send(
                {
                    ...testPostInputData,
                    title: 'test 3'
                }
            )
            .expect(http_response.created);
        await request(app).get(`/posts/${postResponse.body.id}`).expect(http_response.ok);
        await request(app)
            .delete(`/posts/${postResponse.body.id}`)
            .set('authorization', `Basic ${credentials}`)
            .expect(http_response.no_content);
        await request(app).get(`/posts/${postResponse.body.id}`).expect(http_response.not_found);
    })
})