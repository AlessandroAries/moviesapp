import { Dayjs } from "dayjs";

export type Genre = {
    id: number;
    name: string;
};

export type Movie = {
    title: string;
    imagePath?: string;
    genres: Genre[];
    releaseDate: Dayjs;
    overview: string;
};
