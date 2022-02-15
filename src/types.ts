export type Genre = {
    id: number;
    name: string;
};

export type Movie = {
    title: string;
    imagePath?: string;
    releaseDate: number;
    overview: string;
    genre_ids: number[];
};

export type MovieWithGenres = Movie & { genres: Genre[] };
