import { useMemo } from 'react';
import { useDispatch, useSelector } from '../store';
import { createSelector } from 'reselect';
import { selectCounter } from './selectors';
import Counter from './Counter';
import { up, down, remove } from './actions';
const createCounterState = () =>
  createSelector(
    selectCounter,
    ({ count, id }) => ({ b: count, id })
  );

export default function CounterContainer(props) {
  const createState = useMemo(createCounterState, []);
  const dispatch = useDispatch();
  const { ID: id } = props;
  const state = useSelector(state => {
    return createState(state, id);
  });
  const mergedState = useMemo(
    () => ({
      ...state,
      up: () => dispatch(up(id)),
      down: () => dispatch(down(id)),
      remove: () => dispatch(remove(id)),
    }),
    [state, id, dispatch]
  );
  return useMemo(() => Counter(mergedState), [mergedState]);
}
