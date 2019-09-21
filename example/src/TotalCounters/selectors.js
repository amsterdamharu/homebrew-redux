import { createSelector } from 'reselect';
import { selectCounters } from '../shared/selectors';
export const selectTotalCounters = createSelector(
  selectCounters,
  counters => counters.length
);
