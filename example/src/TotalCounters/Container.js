import { useMemo } from 'react';
import { useSelector } from '../store';
import { selectTotalCounters } from './selectors';
import Total from './Total';

export default function CounterContainer() {
  const total = useSelector(selectTotalCounters);
  const props = useMemo(() => ({ total }), [total]);
  return useMemo(() => Total(props), [props]);
}
