import {createApp} from "../../src/app";
import {httpResponse} from "../../src/core/types/http_responses";
import request from "supertest";
import {VideoInputDto} from "../../src/videos/dto/video.Input_dto";
import {Resolutions} from "../../src/videos/types/videoType";
import {VideoPutDto} from "../../src/videos/dto/video.put_dto";

const testVideoData: VideoInputDto = {
    title: 'test_title',
    author: 'test_author',
    availableResolutions: [Resolutions.P144, Resolutions.P1080]
}
const testPutData: VideoPutDto = {
    title: "string",
    author: "string",
    availableResolutions: [
        Resolutions.P720
    ],
    canBeDownloaded: true,
    minAgeRestriction: 18,
    publicationDate: "2026-01-02T23:47:11.521Z"
}

const testWrongPutData = {
    title: null,
    author: "string",
    availableResolutions: [
        Resolutions.P144
    ],
    canBeDownloaded: "string",
    minAgeRestriction: 18,
    publicationDate: "2026-01-06T18:20:59.697Z"
}

describe('VIDEOS API', () => {
    const app = createApp();

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpResponse.no_content);
    })

    it('Should create a video and return status 201', async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: 'test_title2',
                author: 'test_author2',
                availableResolutions: [Resolutions.P240, Resolutions.P480]
            })
            .expect(httpResponse.created)
        const getResponse = await request(app).get(`/videos/${postResponse.body.id}`).expect(httpResponse.ok);
        expect(getResponse.body).toEqual({
            ...postResponse.body,
            id: expect.any(Number),
        })
    })

    it('Should return status 200 and list of videos', async () => {
        await request(app)
            .post('/videos')
            .send(testVideoData)
            .expect(httpResponse.created)
        const getResponse = await request(app).get('/videos').expect(httpResponse.ok);
        expect(Array.isArray(getResponse.body)).toBe(true);
        expect(getResponse.body.length).toBeGreaterThanOrEqual(1);
    })
    it('Should return video by id and status 200', async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: 'test_title2',
                author: 'test_author2',
                availableResolutions: [Resolutions.P240, Resolutions.P480]
            })
            .expect(httpResponse.created)
        const getResponse = await request(app).get(`/videos/${postResponse.body.id}`).expect(httpResponse.ok);
        expect(getResponse.body).toEqual({
            ...postResponse.body,
            id: expect.any(Number),
        })
    })

    it('Should delete video by id and status 204', async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: 'test_title3',
                author: 'test_author3',
                availableResolutions: [Resolutions.P480, Resolutions.P720]
            })
            .expect(httpResponse.created)
        await request(app).delete(`/videos/${postResponse.body.id}`).expect(httpResponse.no_content);
    })

    it ('Should update video by id and status 204', async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: 'test_title4',
                author: 'test_author4',
                availableResolutions: [Resolutions.P480, Resolutions.P720]
            })
            .expect(httpResponse.created)
        await request(app)
            .put(`/videos/${postResponse.body.id}`)
            .send(testPutData)
            .expect(httpResponse.no_content)
        const getResponse = await request(app).get(`/videos/${postResponse.body.id}`).expect(httpResponse.ok);
        expect(getResponse.body).toEqual({
            ...testPutData,
            id: expect.any(Number),
            createdAt: expect.any(String),
        })
    });
    it (`Shouldn't post a video and status 400 because of bad title`, async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: null,
                author: 'test_author5',
                availableResolutions: [Resolutions.P480, Resolutions.P720]
            })
            .expect(httpResponse.bad_request)
        expect(postResponse.body).toEqual({errorsMessages: [{message: expect.any(String), field: expect.any(String)}]})
    })
    it (`Shouldn't post a video and status 400 because of bad author`, async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: 'title5',
                author: 'test_author4test_author4test_author4test_author4test_author4test_author4test_author4',
                availableResolutions: [Resolutions.P480, Resolutions.P720]
            })
            .expect(httpResponse.bad_request)
        expect(postResponse.body).toEqual({errorsMessages: [{message: expect.any(String), field: expect.any(String)}]})
    })

    it (`Shouldn't update a video by id and status 400 because od bad author`, async () => {
        const postResponse = await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                title: 'test_title6',
                author: 'test_author6',
                availableResolutions: [Resolutions.P480, Resolutions.P720, Resolutions.P1440]
            })
            .expect(httpResponse.created)
        const putResponse = await request(app)
            .put(`/videos/${postResponse.body.id}`)
            .send(testWrongPutData)
            .expect(httpResponse.bad_request)
        console.log(putResponse.body)
    })
})