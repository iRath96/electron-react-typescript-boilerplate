import { Reducer, Action } from 'redux';

export interface IAction extends Action {}
export interface IActionWithPayload<T> extends IAction {
  readonly payload: T;
}

interface IActionCreator<T> extends Reducer<T> {
  readonly type: string;
  (payload: T): IActionWithPayload<T>;

  test(action: IAction): action is IActionWithPayload<T>;
}

interface IActionCreatorVoid extends IActionCreator<void> {
  (): IAction;
}

export const actionCreator = <T>(type: string): IActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
    test(action: IAction): action is IActionWithPayload<T> {
      return action.type === type;
    }
  });

export const actionCreatorVoid = (type: string): IActionCreatorVoid =>
  Object.assign((): any => ({ type }), {
    type,
    test(action: IAction): action is IAction {
      return action.type === type;
    }
  });
