import { observer } from "mobx-react";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { useStores } from "../../../hooks/mobx-hooks";
import { UpcomingMovieScreenProps } from "../../../navigation/MainStackNavigator";
import { Movie } from "../../../types";
import { H3 } from "../../common/Headings";
import { Colors, Margins } from "../../common/Styles";
import { UpcomingMoviesList } from "./UpcomingMoviesList";
import { UpcomingMoviesScreenFilterButton } from "./UpcomingMoviesScreenFilterButton";

const UpcomingMoviesScreenComponent = ({ navigation }: UpcomingMovieScreenProps) => {
    const { moviesStore } = useStores();
    const [filter, setFilter] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <UpcomingMoviesScreenFilterButton onPress={() => setFilter(!filter)} />
            ),
        });
    }, [navigation, filter]);

    async function loadNextPage() {
        return moviesStore.loadNextPageUpcomingMovies();
    }

    async function onRefresh() {
        return moviesStore.refreshUpcomingMovies();
    }

    function onPressMovie(movie: Movie) {
        navigation.navigate("MovieDetail", { movie });
    }

    const showMessage =
        moviesStore.filteredUpcomingMovies === "failed" ||
        (filter && !moviesStore.filteredUpcomingMovies.length);
    return (
        <SafeAreaView style={{ backgroundColor: Colors.GREY }}>
            {filter && (
                <TextInput
                    autoFocus={true}
                    onChangeText={(text: string) => {
                        moviesStore.setUpcomingMoviesNameFilter(text);
                    }}
                    style={styles.input}
                    placeholder={"Search movie"}
                />
            )}

            <UpcomingMoviesList
                movies={
                    moviesStore.filteredUpcomingMovies !== "failed"
                        ? moviesStore.filteredUpcomingMovies
                        : []
                }
                loadNextPage={loadNextPage}
                onRefresh={onRefresh}
                onPressMovie={onPressMovie}
                header={
                    showMessage ? (
                        <View style={styles.noMoviesContainer}>
                            <H3>
                                {moviesStore.filteredUpcomingMovies === "failed"
                                    ? "Something went wrong while fetching the upcoming movies. Please try again by refreshing this page"
                                    : "No movies found for your search"}
                            </H3>
                        </View>
                    ) : undefined
                }
            />
        </SafeAreaView>
    );
};

export const UpcomingMoviesScreen = observer(UpcomingMoviesScreenComponent);

const styles = StyleSheet.create({
    noMoviesContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: Margins.MARGIN_NORMAL,
    },
    input: {
        borderColor: Colors.BLACK,
        borderWidth: 1,
        margin: Margins.MARGIN_SMALL,
        paddingVertical: Margins.MARGIN_SMALLEST,
        paddingLeft: Margins.MARGIN_SMALLEST,
    },
});
