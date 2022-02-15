import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { MovieDetailScreen } from "../components/screens/movie-detail/MovieDetail";
import { UpcomingMoviesScreen } from "../components/screens/upcoming-movies/UpcomingMoviesScreen";
import { MovieWithGenres } from "../types";

export type RootStackParamList = {
    UpcomingMovies: {};
    MovieDetail: {
        movie: MovieWithGenres;
    };
};

export type UpcomingMovieScreenProps = NativeStackScreenProps<RootStackParamList, "UpcomingMovies">;
export type MovieDetailScreenProps = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UpcomingMovies"
                component={UpcomingMoviesScreen}
                options={{
                    title: "Upcoming movies",
                }}
            />
            <Stack.Screen
                name="MovieDetail"
                component={MovieDetailScreen}
                options={{
                    title: "Movie",
                }}
            />
        </Stack.Navigator>
    );
};
