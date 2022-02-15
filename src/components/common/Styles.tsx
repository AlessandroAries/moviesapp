import { TextStyle } from "react-native";

export const Colors = {
    DARK_GREY: "#727171",
    GREY: "#F2F2F2",
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

export const TextStyles: { [name: string]: TextStyle } = {
    h1: {
        fontFamily: Fonts.FUTURA,
        color: Colors.BLACK,
        fontSize: 28,
    },
    h2: {
        fontFamily: Fonts.FUTURA,
        color: Colors.BLACK,
        fontSize: 22,
    },
    h3: {
        fontFamily: Fonts.FUTURA,
        color: Colors.BLACK,
        fontSize: 16,
    },
    text: {
        fontSize: 14,
    },
};
