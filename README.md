# Homebrew redux and react-redux

### Install

You should be able to add it as a dependency but it somehow breaks the compile. Currently I just copy [store.js](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js) as [cs.js](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/cs.js) and import cs.js.

The following doesn't work yet (have to figure out what's breaking the compile)
This is not available on nmp so you can't use `yarn add`, you can add it to the package.json (note that I cannot get this to work yet):

```
  "dependencies": {
    "store": "amsterdamharu/homebrew-redux"
  }
```

### Example

Example app is included in the example directory so you can run `yarn install` from the example directory and start the app with `yarn start`.

## Functions in homebrew store

### CreateStore

The [createStore](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L12) works a little different than [redux createStore](https://redux.js.org/api/createstore) as it doesn't do anything with the initialState parameter. This is because redux dev tools won't call createStore with the initialState and I could not get it to work if you do set it. Now your root reducer should provide initialState `const rootReducer = (state=initialState, action)=>state`

You can provide multiple enhancers with [compose](#compose) and convert `store=>next=>action` middleware functions to an enhancer with [applyMiddleware](#applyMiddleware).

The createStore function will return `{store, useSelector,useDispatch}`, an example of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L48)

### applyMiddleware

With [applyMiddleware](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L58) you can convert a function `store=>next=>action` to an enhancer (function with signature: `createStore=>(reducer,initialState,enhancer)`). The initialState is not used because I could not set it and get it to work with redux dev tools (see [createStore](#createStore)).

Example of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L19)

### compose

With [compose](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L71) you can compose enhancers, it is almost the same as [redux compose](https://redux.js.org/api/compose#composefunctions) but you have to pass at least one function to it and if you pass something that isn't a function it will be filtered out.

This enables you to pass redux dev tools to compose as long as at least one other enhancer is a function:

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

An example of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L18)

### createStoreProvider

With [createStoreProvider](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L82) you can create something resembling a [react-redux Provider](https://react-redux.js.org/api/provider), you need to pass it a store that you created with [createStore](#createStore).

Because you passed the store when you created the Provider you don't need to pass it as props when you use the provider. So `<Provider store={store}>` is not needed, you can just do: `<Provider>`

An example of how it's created can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/store.js#L54) and an example of how the provider is used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/index.js#L8)

### useSelector

The [useSelector](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L52) hook is returned from [createStore](#createStore). With useSelector you can select information from the store, it is simular to [react-redux useSelector](https://react-redux.js.org/next/api/hooks#useselector) but it doesn't take the second argument (equality function), to memoize you can use createSelector from [reselect](https://github.com/reduxjs/reselect).

Examples of how it's used can be fount [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counters/container.js#L8) and [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counter/Container.js#L17)

### useDispatch

The [useDispatch](https://github.com/amsterdamharu/homebrew-redux/blob/master/store/index.js#L50) function is returned from [createStore](#createStore) and is the same as [react-redux useDispatch](https://react-redux.js.org/next/api/hooks#usedispatch). It will return a dispatch function that can be used to dispatch actions.

Examples of how it's used can be found [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counters/container.js#L13) and [here](https://github.com/amsterdamharu/homebrew-redux/blob/master/example/src/Counter/Container.js#L23).
