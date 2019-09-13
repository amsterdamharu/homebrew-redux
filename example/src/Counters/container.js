import { useMemo } from 'react';
import { useSelector, useDispatch } from '../store';
import Counters from './Counters';
import { selectCounters } from '../shared/selectors';
import { add, none } from './actions';

export default function CountersContainer() {
  const counters = useSelector(selectCounters);
  const dispatch = useDispatch();
  const mergedState = useMemo(
    () => ({
      counters,
      add: () => dispatch(add()),
      none: () => dispatch(none()),
    }),
    [counters, dispatch]
  );
  return useMemo(() => Counters(mergedState), [
    mergedState,
  ]);
}
