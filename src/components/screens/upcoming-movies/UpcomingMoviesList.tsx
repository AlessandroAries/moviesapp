import React from "react";
import { ListRenderItemInfo } from "react-native";
import { Movie } from "../../../types";
import { PaginatedFlatList } from "../../common/PaginatedFlatList";
import { UpcomingMovieListItem } from "./UpcomingMovieListItem";

type Props = {
    movies: Movie[];
    loadNextPage: () => Promise<boolean>;
    onRefresh: () => Promise<void>;
    onPressMovie: (movie: Movie) => void;
};

export function UpcomingMoviesList({ movies, loadNextPage, onRefresh, onPressMovie }: Props) {
    function renderMovieItem(info: ListRenderItemInfo<Movie>) {
        return <UpcomingMovieListItem movie={info.item} onPress={onPressMovie} />;
    }

    return (
        <PaginatedFlatList
            data={movies}
            renderItem={renderMovieItem}
            loadNextPage={loadNextPage}
            onRefresh={onRefresh}
        />
    );
}
