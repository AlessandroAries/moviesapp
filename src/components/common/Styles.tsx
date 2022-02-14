import { TextStyle } from "react-native";

export const Colors = {
    DARK_GREY: "#727171",
    GREY: "#EEEDED",
    WHITE: "#FFFFFF",
    BLACK: "#000000",
};

export const Margins = {
    MARGIN_SMALLEST: 4,
    MARGIN_SMALL: 8,
    MARGIN_NORMAL: 16,
    MARGIN_BIG: 32,
};

const Fonts = {
    FUTURA: "Futura",
};

export const h1: TextStyle = {
    fontFamily: Fonts.FUTURA,
    color: Colors.BLACK,
    fontSize: 28,
};

export const h2: TextStyle = {
    fontFamily: Fonts.FUTURA,
    color: Colors.BLACK,
    fontSize: 22,
};

export const h3: TextStyle = {
    fontFamily: Fonts.FUTURA,
    color: Colors.BLACK,
    fontSize: 16,
};
