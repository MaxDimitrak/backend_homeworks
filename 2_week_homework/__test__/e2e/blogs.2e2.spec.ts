import request from "supertest";
import {createApp} from "../../src/app";
import {Express} from "express";
import {http_response} from "../../src/core/types/http_responses";
import {BlogInputDto} from "../../src/blogs/dto/blog.input_dto";


describe('testing blogs page', (): void => {
    const app: Express = createApp();
    const credentials: string = Buffer.from('admin:qwerty').toString('base64');

    const testInputBlogData: BlogInputDto = {
        name: 'Test',
        description: 'Description Test',
        websiteUrl: 'https://test1.pom/',
    }
    const testUpdateBlogData = {
        name: "Update Test",
        description: "Update Description",
        websiteUrl: "https://dvwBb57sDN.s4SuPpmGXpPxb8wkA1hdUFnO1Owf9i95j0r9ACNUCxtCMjDeK5RZb2t7O75crt5S7r_M-Y.99UXz0BW98"
    }

    const testWrongBlogData = {
        name: '',
        description: 'Description Test',
        websiteUrl: 'https://test1.pom/',
    }

    beforeAll(async (): Promise<void> => {
        await request(app).delete('/testing/all-data').expect(http_response.no_content)
    })

    it(`Should create a blog and return the created blog`, async (): Promise<void> => {
        const postResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${credentials}`)
            .send({
                ...testInputBlogData,
                name: 'Test 1',
            })
            .expect(http_response.created);
        const getByIdResponse = await request(app)
            .get(`/blogs/${postResponse.body.id}`).expect(http_response.ok);
        expect(getByIdResponse.body).toEqual({
                ...postResponse.body,
                id: expect.any(String),
            }
        )
    })
    it(`Shouldn't create a blog and return unauthorized status code`, async (): Promise<void> => {
        await request(app)
            .post('/blogs')
            .send({
                ...testInputBlogData,
                name: 'Test 1',
            })
            .expect(http_response.unauthorized);
    })
    it(`Shouldn't update a blog and return unauthorized status code`, async (): Promise<void> => {
        const postResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${credentials}`)
            .send({
                ...testInputBlogData,
                name: 'Test 2',
            })
            .expect(http_response.created);
        await request(app)
            .put(`/blogs/${postResponse.body.id}`)
            .send(testUpdateBlogData)
            .expect(http_response.unauthorized);
    })
    it(`Should update a blog and return unauthorized status code`, async (): Promise<void> => {
        const postResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${credentials}`)
            .send({
                ...testInputBlogData,
                name: 'Test 3',
            })
            .expect(http_response.created);
        await request(app)
            .put(`/blogs/${postResponse.body.id}`)
            .set('Authorization', `Basic ${credentials}`)
            .send(testUpdateBlogData)
            .expect(http_response.no_content);
    })
    it(`Should create a blog and delete the created blog`, async (): Promise<void> => {
        const postResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${credentials}`)
            .send({
                ...testInputBlogData,
                name: 'Test 4',
            })
            .expect(http_response.created);
        await request(app)
            .delete(`/blogs/${postResponse.body.id}`)
            .set('Authorization', `Basic ${credentials}`)
            .expect(http_response.no_content);
    })
    it(`Should create a blog and don't delete the created blog plus return unauthorized status code`, async (): Promise<void> => {
        const postResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${credentials}`)
            .send({
                ...testInputBlogData,
                name: 'Test 5',
            })
            .expect(http_response.created);
        await request(app)
            .delete(`/blogs/${postResponse.body.id}`)
            .expect(http_response.unauthorized);
    })
    it(`Shouldn't return blog by id because of incorrect id`, async (): Promise<void> => {
        await request(app).get('/blogs/ss').expect(http_response.bad_request);
    })
    it(`Shouldn't create blog by id because of incorrect data`, async (): Promise<void> => {
        const postResponse = await request(app)
            .post('/blogs')
            .set('Authorization', `Basic ${credentials}`)
            .send({
                ...testWrongBlogData,
                name: 'Test 5',
                websiteUrl: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            })
            .expect(http_response.bad_request);
        console.log(postResponse.body);
    })
})