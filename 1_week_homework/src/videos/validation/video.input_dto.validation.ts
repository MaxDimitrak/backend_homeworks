import {ValidationError} from "../types/validationError";
import {VideoInputDto} from "../dto/video.Input_dto";
import {Resolutions} from "../types/videoType";

export const videoInputDtoValidation = (data: VideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];
    if (typeof data.title !== 'string' ||
        data.title.trim().length < 1 ||
        data.title.trim().length > 40
    ) {
        errors.push({message: 'Invalid title', field: 'title'});
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

    return errors;
}