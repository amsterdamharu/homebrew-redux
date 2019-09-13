import { counterReducer } from '../Counter';
import { counterActions } from '../Counter';
import { ADD, NONE } from './actions';
const { UP, DOWN, REMOVE } = counterActions;
const createId = (i => () => i++)(10);
export default (state, action) => {
  const { type } = action;
  if (type === ADD) {
    return {
      ...state,
      counters: state.counters.concat({
        count: state.counters.length,
        id: createId(),
      }),
    };
  }
  if (type === NONE) {
    return { ...state };
  }
  if ([UP, DOWN, REMOVE].includes(action.type)) {
    return counterReducer(state, action);
  }
  return state;
};
