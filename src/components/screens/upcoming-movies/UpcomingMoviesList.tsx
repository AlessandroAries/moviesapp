import React from "react";
import { ListRenderItemInfo } from "react-native";
import { Movie } from "../../../types";
import { PaginatedFlatList } from "../../common/PaginatedFlatList";
import { UpcomingMovieListItem } from "./UpcomingMovieListItem";

type Props = {
    movies: Movie[];
    loadNextPage: () => Promise<boolean>;
    onRefresh: () => Promise<void>;
};

export function UpcomingMoviesList({ movies, loadNextPage, onRefresh }: Props) {
    function renderMovieItem(info: ListRenderItemInfo<Movie>) {
        return <UpcomingMovieListItem {...info.item} />;
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
