import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../common/Styles";

type Props = { filter: boolean; onPress: () => void };

export const UpcomingMoviesScreenFilterButton: React.FC<Props> = ({ filter, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={require("../../../../assets/search.png")}
                style={[styles.image, filter ? styles.filterOn : styles.filterOff]}
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
    filterOn: {
        tintColor: Colors.BLACK,
    },
    filterOff: {
        tintColor: Colors.GREY,
    },
});
