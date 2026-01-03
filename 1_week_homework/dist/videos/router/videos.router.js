"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const http_responses_1 = require("../../core/types/http_responses");
const videos_db_1 = require("../../db/videos.db");
const video_input_dto_validation_1 = require("../validation/video.input_dto.validation");
const error_utils_1 = require("../../core/utils/error.utils");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter.get('/', (req, res) => {
    res.status(http_responses_1.httpResponse.ok).json(videos_db_1.videosDB.data);
});
exports.videosRouter.get('/:id', (req, res) => {
    const foundVideo = videos_db_1.videosDB.data.find(v => v.id === +req.params.id);
    if (!foundVideo)
        return res.sendStatus(http_responses_1.httpResponse.not_found);
    res.status(http_responses_1.httpResponse.ok).json(foundVideo);
});
exports.videosRouter.post('/', (req, res) => {
    const errors = (0, video_input_dto_validation_1.videoInputDtoValidation)(req.body);
    if (errors.length) {
        res.status(http_responses_1.httpResponse.bad_request).json((0, error_utils_1.createErrorMessages)(errors));
    }
    const body = req.body;
    const createdAtDate = new Date();
    const publicationDate = new Date(createdAtDate);
    publicationDate.setDate(publicationDate.getDate() + 1);
    const newVideo = Object.assign({ id: videos_db_1.videosDB.data.length ? videos_db_1.videosDB.data[videos_db_1.videosDB.data.length - 1].id + 1 : 1, canBeDownloaded: false, minAgeRestriction: null, createdAt: createdAtDate, publicationDate: publicationDate }, body);
    videos_db_1.videosDB.data.push(newVideo);
    res.status(http_responses_1.httpResponse.created).json(newVideo);
});
exports.videosRouter.put('/:id', (req, res) => {
    const errors = (0, video_input_dto_validation_1.videoInputDtoValidation)(req.body);
    if (errors.length) {
        res.status(http_responses_1.httpResponse.bad_request).json((0, error_utils_1.createErrorMessages)(errors));
    }
    const foundVideo = videos_db_1.videosDB.data.find(v => v.id === +req.params.id);
    if (!foundVideo)
        return res.sendStatus(http_responses_1.httpResponse.not_found);
    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;
    foundVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundVideo.minAgeRestriction = req.body.minAgeRestriction;
    foundVideo.publicationDate = req.body.publicationDate;
    res.sendStatus(http_responses_1.httpResponse.no_content);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const foundIndexVideo = videos_db_1.videosDB.data.findIndex(v => v.id === +req.params.id);
    if (foundIndexVideo === -1)
        return res.sendStatus(http_responses_1.httpResponse.not_found);
    videos_db_1.videosDB.data.splice(foundIndexVideo, 1);
    res.sendStatus(http_responses_1.httpResponse.no_content);
});
