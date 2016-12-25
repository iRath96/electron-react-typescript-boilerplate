import { expect } from 'chai';
import counter from '../../app/reducers/counter';
import { increment, decrement } from '../../app/actions/counter';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counter(undefined, { type: 'unknown' })).to.equal(0);
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(counter(1, increment())).to.equal(2);
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(counter(1, decrement())).to.equal(0);
    });

    it('should handle unknown action type', () => {
      expect(counter(1, { type: 'unknown' })).to.equal(1);
    });
  });
});
