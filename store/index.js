import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const StoreContext = createContext();
export const createStore = (
  reducer,
  initialState,
  enhancer
) => {
  let listeners = [];
  const wrapReducer = (state = initialState, action) =>
    reducer(state, action);
  const createStore = (reducer, notUsed, enhancer) => {
    if (typeof enhancer === 'function') {
      return enhancer(createStore)(reducer);
    }
    let value = reducer(undefined, {
      type: `@@redux/INIT ${new Date().getTime()}`,
    });
    const setValue = newValue => {
      if (value === newValue) {
        return;
      }
      value = newValue;
      listeners.forEach(listener => listener(value));
    };
    const s = {
      getState: () => value,
      subscribe: listener => {
        listeners.push(listener);
        return () =>
          (listeners = listeners.filter(
            l => l !== listener
          ));
      },
      dispatch: action => {
        const newState = reducer(s.getState(), action);
        setValue(newState);
      },
    };
    return s;
  };
  const store = createStore(
    wrapReducer,
    undefined,
    enhancer
  );

  return {
    useDispatch: () => store.dispatch,
    store,
    useSelector: selector => {
      const state = useContext(StoreContext);
      return selector(state);
    },
  };
};
export const applyMiddleware = (...functions) => {
  return createStore => (reducer, notUsed, enhancer) => {
    const store = createStore(reducer, undefined, enhancer);
    const dispatch = compose(
      ...functions.map(fn => fn(store))
    )(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
};

export const compose = (...functions) => {
  return (
    functions
      //take out non functions
      .filter(e => typeof e === 'function')
      .reduce((result, fn) => {
        return (...args) => result(fn(...args));
      })
  );
};

export const createStoreProvider = store => ({
  children,
}) => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    const remove = store.subscribe(() => {
      const lastState = store.getState();
      Promise.resolve().then(() => {
        if (lastState === store.getState()) {
          setState(store.getState());
        }
      });
    });
    return () => remove();
  }, []);
  return (
    <StoreContext.Provider value={state}>
      {children}
    </StoreContext.Provider>
  );
};
//@todo: document combineReducers and test it (only rough idea of how it should work)
//  https://redux.js.org/api/combinereducers#combinereducersreducers
export const combineReducers = reducers =>
  function combinedReducers(state, action) {
    return {
      ...state,
      ...Object.entries(reducers).reduce(
        (result, [key, reducer]) => ({
          ...result,
          [key]: reducer(state, action),
        }),
        {}
      ),
    };
  };
