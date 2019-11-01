import { createSelector } from 'homebrew-redux';

export const selectCounters = createSelector(
  state => state,
  state => state.counters
);
