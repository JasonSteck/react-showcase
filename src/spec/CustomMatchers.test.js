import { CustomMatchers } from './CustomMatchers.js';

class Thing extends CustomMatchers {
  constructor(val) {
    super();
    this.val = val;
  }

  doubleVal() {
    this.val = 2 * this.val;
  }

  toBeVal(expected) {
    return this.val === expected;
  }

  toBe4() { // returns custom result
    const pass = 4 === this.val;
    const not = pass ? ' not' : '';
    return {
      pass,
      message: `Expected value to${not} be 4, got ${this.val}`,
    }
  }

  toHaveVal() {
    // fyi, we shouldn't use expectations in here because they don't yet consider ".not".
    // e.g. `expect(t).not.toHaveVal()` is identical to `expect(t).toHaveVal()`
    expect(this.val).toBeDefined();
    return; // our matcher (currently) should fail when nothing is returned
  }
}

describe('Custom  Matchers', () => {
  describe('(PASSING EXPECTATIONS)', () => {
    it('uses the default "expect" behavior when not given a CustomMatcher', () => {
      expect(10).toBe(10);
      expect(11).not.toBe(10);
    });

    it('can use custom properties, actions, and matchers', () => {
      const t = new Thing(1);
      t.doubleVal();
      expect(t).toBeVal(2);
    });

    it('can use ".not"', () => {
      const t = new Thing(1);
      t.doubleVal();
      expect(t).not.toBeVal(9);
    });

    it('can handle a custom result', () => {
      const t = new Thing(2);
      t.doubleVal();
      expect(t).toBe4();
    });

    it('can handle a custom result with ".not"', () => {
      const t = new Thing(3);
      t.doubleVal();
      expect(t).not.toBe4();
    });
  });

  describe('(FAILING EXPECTATIONS) fails when', () => {
    it('there is no return value', () => {
      const t = new Thing(1);
      expect(() => {
        expect(t).toHaveVal();
      }).toThrow('Currently, all matchers must return a value and cannot contain expectations.');
    });

    it('"false" is returned as the result', () => {
      const t = new Thing(1);
      expect(() => {
        expect(t).toBeVal(9);
      }).toThrow();
    });

    it('"true" is returned when using ".not"', () => {
      const t = new Thing(6);
      expect(() => {
        expect(t).not.toBeVal(6);
      }).toThrow();
    });

    it('pass is "false"', () => {
      const t = new Thing(7);
      let errorMessage;
      expect(() => {
        expect(t).toBe4();
      }).toThrow('Expected value to be 4, got 7');
    });

    it('pass is "true" when using ".not"', () => {
      const t = new Thing(4);
      expect(() => {
        expect(t).not.toBe4();
      }).toThrow('Expected value to not be 4, got 4');
    });
  });
});
