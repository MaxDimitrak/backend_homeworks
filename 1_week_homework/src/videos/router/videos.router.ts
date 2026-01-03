import {Request, Response, Router} from "express";
import {httpResponse} from "../../core/types/http_responses";
import {videosDB} from "../../db/videos.db";
import {Video} from "../types/videoType";
import {VideoInputDto} from "../dto/video.Input_dto";
import {videoInputDtoValidation} from "../validation/video.input_dto.validation";
import {ValidationError} from "../types/validationError";
import {createErrorMessages} from "../../core/utils/error.utils";
import {videoPutDtoValidation} from "../validation/video.put_dto.validation";


export const videosRouter: Router = Router({})

videosRouter.get('/', (req: Request, res) => {
    res.status(httpResponse.ok).json(videosDB.data);
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const foundVideo: Video | undefined = videosDB.data.find(v => v.id === +req.params.id);
    if (!foundVideo)
        return res.sendStatus(httpResponse.not_found)
    res.status(httpResponse.ok).json(foundVideo);
})

videosRouter.post('/', (req: Request, res: Response) => {
    const errors: ValidationError[] = videoInputDtoValidation(req.body);
    if (errors.length) {
        res.status(httpResponse.bad_request).json(createErrorMessages(errors));
    }
    const body: VideoInputDto = req.body;
    const createdAtDate: Date = new Date();
    const publicationDate: Date = new Date(createdAtDate);
    publicationDate.setDate(publicationDate.getDate() + 1);
    const newVideo: Video = {
        id: videosDB.data.length ? videosDB.data[videosDB.data.length - 1].id + 1 : 1,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAtDate,
        publicationDate: publicationDate,
        ...body
    }
    videosDB.data.push(newVideo);
    res.status(httpResponse.created).json(newVideo);
})

videosRouter.put('/:id', (req: Request, res: Response) => {
    const errors: ValidationError[] = videoPutDtoValidation(req.body);
    if (errors.length) {
        res.status(httpResponse.bad_request).json(createErrorMessages(errors));
    }
    const foundVideo: Video | undefined = videosDB.data.find(v => v.id === +req.params.id);
    if (!foundVideo)
        return res.sendStatus(httpResponse.not_found)
    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;
    foundVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundVideo.minAgeRestriction = req.body.minAgeRestriction;
    foundVideo.publicationDate = req.body.publicationDate;
    res.sendStatus(httpResponse.no_content)
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    const foundIndexVideo: number = videosDB.data.findIndex(v => v.id === +req.params.id);
    if (foundIndexVideo === -1)
        return res.sendStatus(httpResponse.not_found)
    videosDB.data.splice(foundIndexVideo, 1);
    res.sendStatus(httpResponse.no_content)
})