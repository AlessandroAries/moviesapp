import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Movie } from "../../../types";
import { H2, H3 } from "../../common/Headings";
import { Colors, Margins } from "../../common/Styles";

const MOVIE_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const UpcomingMovieListItem: React.FC<Movie> = (movie: Movie) => {
    const genresText = movie.genres.reduce(
        (acc, value, index) => `${acc}${index !== 0 ? ", " : ""}${value.name}`,
        ""
    );
    return (
        <View style={styles.container}>
            <Image
                source={
                    movie.imagePath
                        ? { uri: `${MOVIE_IMAGE_BASE_URL}${movie.imagePath}` }
                        : require("../../../../assets/movie_board.png")
                }
                resizeMode={"contain"}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <H2>{movie.title}</H2>
                <Text>{genresText}</Text>
                <H3 style={styles.releaseDateText}>{`Release date`}</H3>
                <Text>{movie.releaseDate.format("MM-DD-YYYY")}</Text>
            </View>
        </View>
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
