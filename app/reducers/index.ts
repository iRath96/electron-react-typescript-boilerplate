import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';

const rootReducer = combineReducers({
  counter,
  routing
});

export interface IState {
  counter: TCounterState;
}

export default rootReducer;
