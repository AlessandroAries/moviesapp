import dayjs from "dayjs";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatMovieGenresText, formatMovieImageUrl } from "../../../format";
import { MovieWithGenres } from "../../../types";
import { H2, H3 } from "../../common/Headings";
import { Colors, Margins } from "../../common/Styles";

type Props = {
    movie: MovieWithGenres;
    onPress: (movie: MovieWithGenres) => void;
};
export const UpcomingMovieListItem: React.FC<Props> = ({ movie, ...props }: Props) => {
    const genresText = formatMovieGenresText(movie);

    function onPress() {
        props.onPress(movie);
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
            <Image
                source={
                    movie.imagePath
                        ? { uri: formatMovieImageUrl(movie) }
                        : require("../../../../assets/movie_board.png")
                }
                resizeMode={"contain"}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <H2>{movie.title}</H2>
                <Text>{genresText}</Text>
                <H3 style={styles.releaseDateText}>{`Release date`}</H3>
                <Text>{dayjs(movie.releaseDate).format("MM-DD-YYYY")}</Text>
            </View>
        </TouchableOpacity>
    );
};

const imageSize = Dimensions.get("window").height / 8;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: Margins.MARGIN_NORMAL,
        marginHorizontal: Margins.MARGIN_SMALL,
        marginTop: Margins.MARGIN_NORMAL,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        borderRadius: Margins.MARGIN_SMALL,
    },
    image: {
        height: imageSize,
        width: imageSize,
    },
    infoContainer: {
        flex: 1,
        marginLeft: Margins.MARGIN_SMALL,
    },
    releaseDateText: {
        marginTop: Margins.MARGIN_SMALLEST,
    },
});
