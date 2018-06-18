export class CustomMatchers {}

export function InitCustomMatchers() {
  global._expect = global.expect;
  global._expect.extend({
    result(_, arg) { // allows us to manually pass or fail a test
      return arg;
    }
  });

  global.expect = actual => new CustomExpectationWrapper(actual);
}

export function hasCustomMatchers(target) {
  return target instanceof CustomMatchers;
}

class CustomExpectationWrapper {
  constructor(actual) {
    if(!hasCustomMatchers(actual)) {
      return global._expect(actual); // fallback to regular expectations
    }
    this._actual = actual;
    this._not = false;
    getMatcherNames(actual).forEach(name => this[name] = this._test.bind(this, name));
  }

  get not() {
    this._not = !this._not;
    return this;
  }

  _test(name, ...args) {
    const actual = this._actual;
    const not = this._not;
    const res = actual[name](...args);
    if(res === undefined) {
      throw new Error('Currently, all matchers must return a value and cannot contain expectations.');
    }

    if(typeof res === 'object' && 'pass' in res) {
      if(not) {
        return global._expect(actual).not.result(res);
      } else {
        return global._expect(actual).result(res);
      }
    } else {
      if(not) {
        return global._expect(res).not.toBeTruthy();
      } else {
        return global._expect(res).toBeTruthy();
      }
    }
  }
}

// inspired by https://stackoverflow.com/a/40577337
function getMatcherNames(obj) {
  let methods = new Set();
  while (obj = getNonObjectProto(obj)) {
    let keys = Reflect.ownKeys(obj)
    keys.forEach(k => methods.add(k));
  }
  methods.delete('constructor');
  return Array.from(methods);
}

function getNonObjectProto(obj) {
  const proto = Reflect.getPrototypeOf(obj);
  if(proto === Object.prototype) {
    return null;
  }
  return proto;
}
