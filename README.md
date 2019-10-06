# Homebrew redux and react-redux

### Install

I would not advice you to use this in projects since it is in development as created as a learning exercise for me, that's why it's not on nmp.

You can add a github dependency with yarn using the following command:

```
yarn add https://github.com/amsterdamharu/homebrew-redux.git
```

The repo comes with an example app and I'd advice using that.

### Example

Clone the repo with:

```
git clone https://github.com/amsterdamharu/homebrew-redux.git
```

Example app is included in the example directory so you can run `yarn install` from the example directory and start the app with `yarn start`.

## Functions in homebrew store

### CreateStore

The [createStore](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L9) works a little different than [redux createStore](https://redux.js.org/api/createstore) as it returns an object that contains store, useDispatch and useSelector.

You can provide multiple enhancers with [compose](#compose) and convert `store=>next=>action` middleware functions to an enhancer with [applyMiddleware](#applyMiddleware).

As stated before; the createStore function will return `{store, useSelector,useDispatch}`, an example of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L48-L52)

### applyMiddleware

With [applyMiddleware](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L62-L73) you can convert one or more middleware functions (=`store=>next=>action`) to an enhancer (=`createStore=>(reducer,initialState,enhancer)`).

Example of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L19-L28) and [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L29-L39). You could just run applyMiddleware and pass all three middleware functions to it but this example is to show that you can pass one or more middleware functions and combine enhancers using [compose](#compose).

### compose

With [compose](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L75-L84) you can compose enhancers, it is almost the same as [redux compose](https://redux.js.org/api/compose#composefunctions) but you have to pass at least one function to it and if you pass something that isn't a function it will be filtered out (no errors thrown).

This enables you to pass redux dev tools enhancer to compose as long as at least one other enhancer is a function:

```
const middleware = compose(
  applyMiddleware(
    () => next => action => {
      console.log('middleware');
      return next(action);
    }
  ),
  //If redux dev tools is not installed as Chrome extension
  //  it will not cause an error because compose will filter
  //  it out and the other enhancer is an enhancer function
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

An example of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L18-L46)

### createStoreProvider

With [createStoreProvider](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L86-L106) you can create something resembling a [react-redux Provider](https://react-redux.js.org/api/provider), you need to pass it a store that you created with [createStore](#createStore).

Because you passed the store when you created the Provider you don't need to pass it as props when you use the provider. So `<Provider store={store}>` is not needed, you can just do: `<Provider>`

An example of how it's created can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L54) and an example of how the provider is used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/index.js#L9)

### useSelector

The [useSelector](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L56-L59) hook is returned from [createStore](#createStore). With useSelector you can select information from the store.

It is similar to [react-redux useSelector](https://react-redux.js.org/next/api/hooks#useselector) but it doesn't take the second argument (equality function), to memoize you can use createSelector from [reselect](https://github.com/reduxjs/reselect).

Examples of how it's used can be fount [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counters/container.js#L8) and [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counter/Container.js#L17-L19)

### useDispatch

The [useDispatch](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L54) function is returned from [createStore](#createStore) and is the same as [react-redux useDispatch](https://react-redux.js.org/next/api/hooks#usedispatch). It will return a dispatch function that can be used to dispatch actions.

Examples of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counters/container.js#L13) and [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counter/Container.js#L23).
