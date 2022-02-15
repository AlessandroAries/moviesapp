import dayjs from "dayjs";
import { observer } from "mobx-react";
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
} from "react-native";
import { formatMovieGenresText, formatMovieImageUrl } from "../../../format";
import { MovieDetailScreenProps } from "../../../navigation/MainStackNavigator";
import { H1, H3 } from "../../common/Headings";
import { Margins, TextStyles } from "../../common/Styles";

const MovieDetailScreenComponent = ({ route }: MovieDetailScreenProps) => {
    const window = useWindowDimensions();
    const { movie } = route.params;
    const genresText = formatMovieGenresText(movie);
    const imageSize = window.width - Margins.MARGIN_BIG;
    return (
        <SafeAreaView>
            <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.scrollView}>
                <Image
                    source={
                        movie.imagePath
                            ? { uri: formatMovieImageUrl(movie) }
                            : require("../../../../assets/movie_board.png")
                    }
                    resizeMode={"contain"}
                    style={{
                        height: imageSize,
                        width: imageSize,
                    }}
                />
                <H1 style={styles.title}>{movie.title}</H1>
                <Text style={styles.overview}>{movie.overview} </Text>
                <Text style={styles.genres}>{genresText}</Text>
                <H3 style={styles.releaseDate}>{`Release date: ${dayjs(movie.releaseDate).format(
                    "MM-DD-YYYY"
                )}`}</H3>
            </ScrollView>
        </SafeAreaView>
    );
};

export const MovieDetailScreen = observer(MovieDetailScreenComponent);

const styles = StyleSheet.create({
    scrollView: {
        alignItems: "center",
        marginHorizontal: Margins.MARGIN_NORMAL,
    },
    title: { marginTop: Margins.MARGIN_NORMAL },
    overview: { ...TextStyles.text, textAlign: "center" },
    genres: { ...TextStyles.text, textAlign: "center", marginTop: Margins.MARGIN_SMALL },
    releaseDate: { marginTop: Margins.MARGIN_SMALL },
});
