export const NAMESPACE = 'COUNTERS:';
export const ADD = `${NAMESPACE}ADD`;
export const NONE = `${NAMESPACE}NONE`;

export const add = () => ({ type: ADD });
export const none = () => ({ type: NONE });
