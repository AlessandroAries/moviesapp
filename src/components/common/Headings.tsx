import React from "react";
import { Text, TextProps } from "react-native";
import { h1, h2, h3 } from "./Styles";

export const H3: React.FC<TextProps> = (props: TextProps) => {
    return <Text {...props} style={[h3, props.style]} />;
};

export const H2: React.FC<TextProps> = (props: TextProps) => {
    return <Text {...props} style={[h2, props.style]} />;
};

export const H1: React.FC<TextProps> = (props: TextProps) => {
    return <Text {...props} style={[h1, props.style]} />;
};
