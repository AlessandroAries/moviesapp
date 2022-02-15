import React from "react";
import { Text, TextProps } from "react-native";
import { TextStyles } from "./Styles";

export const H3: React.FC<TextProps> = (props: TextProps) => {
    return <Text {...props} style={[TextStyles.h3, props.style]} />;
};

export const H2: React.FC<TextProps> = (props: TextProps) => {
    return <Text {...props} style={[TextStyles.h2, props.style]} />;
};

export const H1: React.FC<TextProps> = (props: TextProps) => {
    return <Text {...props} style={[TextStyles.h1, props.style]} />;
};
