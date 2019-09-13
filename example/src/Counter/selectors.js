import { createSelector } from 'reselect';
import { selectCounters } from '../shared/selectors';
export const selectCounter = createSelector(
  selectCounters,
  (_, id) => id,
  (counters, id) =>
    counters.find(counter => counter.id === id)
);
