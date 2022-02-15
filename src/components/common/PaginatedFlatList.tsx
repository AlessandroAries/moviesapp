import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    RefreshControl,
    StyleSheet,
    View,
} from "react-native";
import { Colors } from "./Styles";

type Props<Data> = {
    data: Data[] | "loading";
    renderItem: ListRenderItem<Data>;
    loadNextPage: () => Promise<boolean>;
    onRefresh: () => Promise<void>;
    header?: JSX.Element;
};

export function PaginatedFlatList<Data>({
    loadNextPage,
    data,
    renderItem,
    onRefresh,
    header,
}: Props<Data>) {
    const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);
    const [loadedAllPages, setLoadedAllPages] = useState<boolean>(false);

    async function onEndReached() {
        if (loadingNextPage || loadedAllPages) {
            return;
        }
        setLoadingNextPage(true);
        const loadedLastPage = await loadNextPage();
        if (loadedLastPage) {
            setLoadedAllPages(true);
        }
        setLoadingNextPage(false);
    }

    return (
        <FlatList
            ListHeaderComponent={header}
            data={data === "loading" ? [] : data}
            renderItem={renderItem}
            onEndReached={onEndReached}
            ListFooterComponent={loadingNextPage ? ListFooterComponent : undefined}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl refreshing={data === "loading"} onRefresh={onRefresh} />
            }
        />
    );
}

function ListFooterComponent() {
    return (
        <View style={styles.footer}>
            <ActivityIndicator color={Colors.DARK_GREY} size={"small"} />
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});
