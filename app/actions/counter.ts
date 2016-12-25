import { actionCreatorVoid } from './helpers';

export const increment = actionCreatorVoid('INCREMENT_COUNTER');
export const decrement = actionCreatorVoid('DECREMENT_COUNTER');

export function incrementIfOdd() {
  return (dispatch: Function, getState: Function) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Function) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
