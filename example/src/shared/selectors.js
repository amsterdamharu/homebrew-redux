import { createSelector } from 'reselect';

export const selectCounters = createSelector(
  state => state,
  state => state.counters
);
