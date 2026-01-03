import {Resolutions} from "../types/videoType";

export type VideoInputDto = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
}