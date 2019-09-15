export const NAMESPACE = 'COUNTER:';
export const UP = `${NAMESPACE}UP`;
export const DOWN = `${NAMESPACE}DOWN`;
export const REMOVE = `${NAMESPACE}REMOVE`;

export const up = id => ({ type: UP, id });
export const down = id => ({ type: DOWN, id });
export const remove = id => ({ type: REMOVE, id });
