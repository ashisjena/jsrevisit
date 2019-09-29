const states = {
  pending: 'Pending',
  resolved: 'Resolved',
  rejected: 'Rejected'
}

class APromise {

  constructor(executor) {
    const tryCall = callback => Nancy.try(_ => callback(this.value));
    const futureCalls = [];
    const callLater = getMember => callback => new APromise(resolve => futureCalls.push(_ => resolve(getMember()(callback))));
    const members = {
      [states.resolved]: {
        state: states.resolved,
        then: tryCall,
        catch: _ => this
      },
      [states.rejected]: {
        state: states.rejected,
        then: _ => this,
        catch: tryCall
      },
      [states.pending]: {
        state: states.pending,
        then: callLater(_ => this.then),
        catch: callLater(_ => this.catch)
      }
    };

    const changeState = state => {
      Object.assign(this, members[state]);
    };

    const apply = (value, state) => {
      if (this.state === states.pending) {
        this.value = value;
        changeState(state);
        for (const futureCall of futureCalls) {
          futureCall();
        }
      }
    }

    const getCallback = state => value => {
      if (value instanceof APromise && state.resolved) {
        value.then(value => apply(value, states.resolved));
        value.catch(value => apply(value, states.rejected));
      } else {
        apply(value, state);
      }
    };

    const resolve = getCallback(states.resolved);
    const reject = getCallback(states.reject);

    changeState(states.pending);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new APromise(resolve => resolve(value));
  }

  static reject(value) {
    return new APromise((_, reject) => reject(value));
  }

  static try(callback) {
    return new APromise(resolve => resolve(callback()));
  }
}

let prom = APromise.reject(42)
  .then(_ => console.log('why'))
  .then(_ => console.log('you'))
  .then(_ => console.log('ignoring me'));