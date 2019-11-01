import { createSelector } from 'homebrew-redux';
import { selectCounters } from '../shared/selectors';
export const selectTotalCounters = createSelector(
  selectCounters,
  counters => counters.length
);
