export type Genre = {
    id: number;
    name: string;
};

export type Movie = {
    title: string;
    imagePath?: string;
    genres: Genre[];
    releaseDate: number;
    overview: string;
};
