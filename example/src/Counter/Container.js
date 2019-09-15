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
  const { ID } = props;
  const state = useSelector(state => {
    return createState(state, ID);
  });
  const mergedState = useMemo(
    () => ({
      ...state,
      up: () => dispatch(up(ID)),
      down: () => dispatch(down(ID)),
      remove: () => dispatch(remove(ID)),
    }),
    [state, ID, dispatch]
  );
  return useMemo(() => Counter(mergedState), [mergedState]);
}
