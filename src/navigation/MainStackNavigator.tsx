import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { UpcomingMoviesScreen } from "../components/screens/upcoming-movies/UpcomingMoviesScreen";

type RootStackParamList = {
    UpcomingMovies: {};
};

export type UpcomingMovieScreenProps = NativeStackScreenProps<RootStackParamList, "UpcomingMovies">;

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
        </Stack.Navigator>
    );
};
