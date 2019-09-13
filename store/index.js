import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const StoreContext = createContext();
//do not try to use initial state, redux dev tools won't
//  pass it along so have to adjust the signature to how
//  dev tools will call it
export const createStore = (reducer, notUsed, enhancer) => {
  let listeners = [];
  const createStore = (reducer, notUsed, enhancer) => {
    if (typeof enhancer === 'function') {
      return enhancer(createStore)(reducer);
    }
    //even if you pass initial state and call reducer
    //  dev tools will flip and crash if it's anything
    //  but undefined
    let value = reducer(undefined, {
      type: `@@redux/INIT ${new Date().getTime()}`,
    });
    let setValue = newValue => {
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
  const store = createStore(reducer, undefined, enhancer);

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
    return {
      ...store,
      dispatch: action => {
        return functions
          .map(fn =>
            fn({
              getState: store.getState,
              dispatch: store.dispatch,
            })
          )
          .concat(() => action => store.dispatch(action))
          .reverse()
          .reduce(
            (result, fn) => action => fn(result)(action),
            next => action => next(action)
          )(action);
      },
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
      setState(store.getState());
    });
    return () => remove();
  }, []);
  return (
    <StoreContext.Provider value={state}>
      {children}
    </StoreContext.Provider>
  );
};
