"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosDB = void 0;
const videoType_1 = require("../videos/types/videoType");
exports.videosDB = {
    data: [
        {
            id: 1,
            title: "JavaScript Basics",
            author: "John Doe",
            canBeDownloaded: false,
            minAgeRestriction: 10,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [videoType_1.Resolutions.P360, videoType_1.Resolutions.P480, videoType_1.Resolutions.P720]
        },
        {
            id: 2,
            title: "Advanced TypeScript",
            author: "Anna Smith",
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [videoType_1.Resolutions.P144, videoType_1.Resolutions.P720, videoType_1.Resolutions.P1080]
        },
        {
            id: 3,
            title: "Node.js Crash Course",
            author: "Michael Brown",
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [videoType_1.Resolutions.P480, videoType_1.Resolutions.P720, videoType_1.Resolutions.P2160]
        },
    ]
};
