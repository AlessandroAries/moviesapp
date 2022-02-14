import { observer } from "mobx-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useStores } from "../../../hooks/mobx-hooks";
import { UpcomingMovieScreenProps } from "../../../navigation/MainStackNavigator";
import { Movie } from "../../../types";
import { H3 } from "../../common/Headings";
import { Colors } from "../../common/Styles";
import { UpcomingMoviesList } from "./UpcomingMoviesList";
import { UpcomingMoviesScreenFilterButton } from "./UpcomingMoviesScreenFilterButton";

const UpcomingMoviesScreenComponent = ({ navigation }: UpcomingMovieScreenProps) => {
    const { moviesStore } = useStores();
    const [filter, setFilter] = useState<boolean>(false);

    function onSearchPress() {
        setFilter((f) => !f);
    }

    function headerRight() {
        return <UpcomingMoviesScreenFilterButton onPress={onSearchPress} filter={filter} />;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight,
        });
    }, [navigation, filter]);

    async function loadNextPage() {
        return moviesStore.loadNextPageUpcomingMovies();
    }

    async function onRefresh() {
        return moviesStore.refreshUpcomingMovies();
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE }}>
            {filter && (
                <TextInput
                    onChangeText={(text: string) => {
                        moviesStore.setUpcomingMoviesNameFilter(text);
                    }}
                    style={{ borderColor: Colors.BLACK, borderWidth: 1 }}
                />
            )}
            <UpcomingMoviesList
                movies={moviesStore.filteredUpcomingMovies}
                loadNextPage={loadNextPage}
                onRefresh={onRefresh}
            />
            {filter && !moviesStore.filteredUpcomingMovies.length && (
                <View style={styles.noMoviesContainer}>
                    <H3>{"No movies found for your search"}</H3>
                </View>
            )}
        </SafeAreaView>
    );
};

export const UpcomingMoviesScreen = observer(UpcomingMoviesScreenComponent);

const styles = StyleSheet.create({
    noMoviesContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
