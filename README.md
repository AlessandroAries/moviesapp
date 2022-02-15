## Build instructions

### iOS

```
yarn install
cd ios && pod install
yarn ios
```

### Android

```
yarn install
yarn android
```

# Used libraries

-   `react-navigation` - Used for navigating between screens.
-   `mobx` - State handling outside components. Main reason for choosing a library like this, is when scaling up you might need certain things in multiple components, so starting with a store from the beginning can help later on. Used for storing the upcoming movies and genres from the api and some loading states.
-   `dayjs` - Very small, handy library for doing things with times and dates. Only used for displaying the release date of a movie.
