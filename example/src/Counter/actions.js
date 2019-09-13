export const UP = 'UP';
export const DOWN = 'DOWN';
export const REMOVE = 'REMOVE';

export const up = id => ({ type: UP, id });
export const down = id => ({ type: DOWN, id });
export const remove = id => ({ type: REMOVE, id });
