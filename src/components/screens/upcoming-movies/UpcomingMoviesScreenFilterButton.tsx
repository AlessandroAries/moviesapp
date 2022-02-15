import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../common/Styles";

type Props = { onPress: () => void };

export const UpcomingMoviesScreenFilterButton: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={require("../../../../assets/search.png")}
                style={[styles.image, styles.filter]}
                resizeMode={"contain"}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 25,
        width: 25,
    },
    filter: {
        tintColor: Colors.BLACK,
    },
});
