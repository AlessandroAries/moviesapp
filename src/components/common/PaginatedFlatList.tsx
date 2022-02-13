import React, { useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, View } from "react-native";
import { Colors } from "./Styles";

type Props<Data> = {
    data: Data[];
    renderItem: ListRenderItem<Data>;
    loadNextPage: () => Promise<boolean>;
};

export function PaginatedFlatList<Data>({ loadNextPage, ...props }: Props<Data>) {
    const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);
    const [loadedAllPages, setLoadedAllPages] = useState<boolean>(false);
    async function onEndReached() {
        if (loadingNextPage) {
            return;
        }
        setLoadingNextPage(true);
        const loadedAllPages = await loadNextPage();
        if (loadedAllPages) {
            setLoadedAllPages(true);
        }
        setLoadingNextPage(false);
    }

    return (
        <FlatList
            style={{ backgroundColor: Colors.WHITE }}
            {...props}
            onEndReached={onEndReached}
            ListFooterComponent={loadingNextPage ? ListFooterComponent : undefined}
            onEndReachedThreshold={0.5}
        />
    );
}

function ListFooterComponent() {
    return (
        <View
            style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator color={Colors.DARK_GREY} size={"small"} />
        </View>
    );
}
