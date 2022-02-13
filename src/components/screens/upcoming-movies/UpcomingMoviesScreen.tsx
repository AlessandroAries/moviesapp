import { observer } from "mobx-react";
import React from "react";
import { ListRenderItemInfo, SafeAreaView, Text, View } from "react-native";
import { Movie } from "../../../api/movie";
import { useStores } from "../../../hooks/mobx-hooks";
import { PaginatedFlatList } from "../../common/PaginatedFlatList";
import { Colors } from "../../common/Styles";

const UpcomingMoviesScreenComponent: React.FC = () => {
    const { moviesStore } = useStores();

    function renderMovieItem(info: ListRenderItemInfo<Movie>) {
        return <MovieItem {...info.item} />;
    }

    async function loadNextPage() {
        return await moviesStore.loadNextPageUpcomingMovies();
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE }}>
            <PaginatedFlatList
                data={moviesStore.filteredUpcomingMovies}
                renderItem={renderMovieItem}
                loadNextPage={loadNextPage}
            />
        </SafeAreaView>
    );
};

export const UpcomingMoviesScreen = observer(UpcomingMoviesScreenComponent);

function MovieItem({ title }: Movie) {
    return (
        <View style={{ height: 100 }}>
            <Text>{title}</Text>
        </View>
    );
}
