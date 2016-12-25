import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';
import { IState } from '../reducers';

function mapStateToProps(state: IState) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
  return bindActionCreators(CounterActions as any, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
