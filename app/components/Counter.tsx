import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

let styles = require('./Counter.scss');

export interface IProps extends RouteComponentProps<any> {
  increment(): void,
  incrementIfOdd(): void,
  incrementAsync(): void,
  decrement(): void,
  counter: number
}

export class Counter extends React.Component<IProps, void> {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`}>
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment}>
            <i className="fa fa-plus" />
          </button>
          <button className={styles.btn} onClick={decrement}>
            <i className="fa fa-minus" />
          </button>
          <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
          <button className={styles.btn} onClick={() => incrementAsync()}>async</button>
        </div>
      </div>
    );
  }
}

export default Counter;
