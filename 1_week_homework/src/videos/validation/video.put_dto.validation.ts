import {VideoPutDto} from "../dto/video.put_dto";
import {ValidationError} from "../types/validationError";
import {Resolutions} from "../types/videoType";

export const videoPutDtoValidation = (data: VideoPutDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (typeof data.title !== 'string' ||
        data.title.trim().length < 1 ||
        data.title.trim().length > 40
    ) {
        errors.push({message: `Invalid title`, field: 'title'});
    }
    if (typeof data.author !== 'string' ||
        data.author.trim().length < 1 ||
        data.author.trim().length > 20
    ) {
        errors.push({message: 'Invalid title', field: 'author'});
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({message: 'Available resolution must be an array', field: 'availableResolutions'});
    } else if (data.availableResolutions.length) {
        const existingResolutions: Resolutions[] = Object.values(Resolutions);
        if (data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({message: 'Invalid available resolution', field: 'availableResolutions'});
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({message: `Invalid available resolution: ${resolution}`, field: 'availableResolutions'});
                break;
            }
        }
    }
    if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({message: `CanBeDownloaded must be boolean`, field: 'canBeDownloaded'});
    }
    if (data.minAgeRestriction !== null){
        if (typeof data.minAgeRestriction !== 'number' ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18) {
            errors.push({message: 'minAgeRestriction must be a number from 1 to 18', field: 'minAgeRestriction'});
        }
    }
    const parsedDate = new Date(data.publicationDate);
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    if ( typeof data.publicationDate !== 'string' ||
        !isoRegex.test(data.publicationDate) ||
        isNaN(parsedDate.getTime())){
        errors.push({message: 'publicationDate must be a valid date', field: 'publicationDate'});
    }

    return errors;
}