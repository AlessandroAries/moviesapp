import React from "react";
import { ListRenderItemInfo } from "react-native";
import { MovieWithGenres } from "../../../types";
import { PaginatedFlatList } from "../../common/PaginatedFlatList";
import { UpcomingMovieListItem } from "./UpcomingMovieListItem";

type Props = {
    movies: MovieWithGenres[];
    loadNextPage: () => Promise<boolean>;
    onRefresh: () => Promise<void>;
    onPressMovie: (movie: MovieWithGenres) => void;
    header?: JSX.Element;
    refreshing: boolean;
};

export function UpcomingMoviesList({
    movies,
    loadNextPage,
    onRefresh,
    onPressMovie,
    header,
    refreshing,
}: Props) {
    function renderMovieItem(info: ListRenderItemInfo<MovieWithGenres>) {
        return <UpcomingMovieListItem movie={info.item} onPress={onPressMovie} />;
    }

    return (
        <PaginatedFlatList
            data={movies}
            renderItem={renderMovieItem}
            loadNextPage={loadNextPage}
            onRefresh={onRefresh}
            header={header}
            refreshing={refreshing}
        />
    );
}
