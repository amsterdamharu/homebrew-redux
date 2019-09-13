import { UP, DOWN, REMOVE } from './actions';
export default (state, action) => {
  const { type } = action;
  if (type === UP || type === DOWN) {
    const { id } = action;
    const direction = type === UP ? 1 : -1;
    return {
      ...state,
      counters: state.counters.map(c =>
        c.id === id
          ? { ...c, count: c.count + direction }
          : c
      ),
    };
  }
  if (type === REMOVE) {
    const { id } = action;
    return {
      ...state,
      counters: state.counters.filter(c => c.id !== id),
    };
  }
  return state;
};
