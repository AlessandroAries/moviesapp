import React from "react";
import { useContext } from "react";
import { MoviesStore } from "../stores/moviesStore";

export const storesContext = React.createContext({
    moviesStore: new MoviesStore(),
});

// Hook which gives access to all stores.
export function useStores() {
    return useContext(storesContext);
}
