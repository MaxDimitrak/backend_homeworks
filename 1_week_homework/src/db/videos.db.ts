import {Resolutions, Video} from "../videos/types/videoType";

export const videosDB: { data: Video[] } = {
    data: [
        {
            id: 1,
            title: "JavaScript Basics",
            author: "John Doe",
            canBeDownloaded: false,
            minAgeRestriction: 10,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [Resolutions.P360, Resolutions.P480, Resolutions.P720]
        },
        {
            id: 2,
            title: "Advanced TypeScript",
            author: "Anna Smith",
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [Resolutions.P144, Resolutions.P720, Resolutions.P1080]
        },
        {
            id: 3,
            title: "Node.js Crash Course",
            author: "Michael Brown",
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: [Resolutions.P480, Resolutions.P720, Resolutions.P2160]
        },

    ]
}