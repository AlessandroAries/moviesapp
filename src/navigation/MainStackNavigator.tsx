import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UpcomingMoviesScreen } from "../components/screens/upcoming-movies/UpcomingMoviesScreen";

const Stack = createNativeStackNavigator();

export const MainStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UpcomingMovies"
                component={UpcomingMoviesScreen}
                options={{ title: "Upcoming movies" }}
            />
        </Stack.Navigator>
    );
};
