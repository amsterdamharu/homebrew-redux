import {
  compose,
  createStore,
  createStoreProvider,
  applyMiddleware,
} from './cs';
import { countersReducer } from './Counters';
const initialState = {
  counters: [...new Array(2)].map((_, id) => ({
    count: 1,
    id,
  })),
};
const rootReducer = (state = initialState, action) => {
  return countersReducer(state, action);
};

const middleware = compose(
  applyMiddleware(
    () => next => action => {
      console.log('first in middleware');
      return next({ ...action, extra: 88888888 });
    },
    () => next => action => {
      console.log('second, action:', action);
      return next(action);
    }
  ),
  applyMiddleware(store => next => action => {
    console.log('third action:', action);
    if (!action.sync) {
      return new Promise(resolve =>
        setTimeout(resolve, 400)
      ).then(() =>
        store.dispatch({ ...action, sync: true })
      );
    }
    return next(action);
  }),
  //best to add this last, you don't want middleware
  //  actions in dev tools (won't play back well)
  //  if you don't pass a function then compose will
  //  remove it for you
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const { store, useSelector, useDispatch } = createStore(
  rootReducer,
  undefined,
  middleware
);

export const StoreProvider = createStoreProvider(store);
export { useSelector, useDispatch };
