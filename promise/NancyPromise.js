const states = {
  pending: 'Pending',
  resolved: 'Resolved',
  rejected: 'Rejected'
};

class Nancy {
  constructor(executor) {
    const tryCall = callback => Nancy.try(() => callback(this.value));
    const laterCalls = [];
    const callLater = getMember => callback => new Nancy(resolve => laterCalls.push(() => resolve(getMember()(callback))));
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
        then: callLater(() => this.then),
        catch: callLater(() => this.catch)
      }
    };
    const changeState = state => Object.assign(this, members[state]);
    const apply = (value, state) => {
      if (this.state === states.pending) {
        this.value = value;
        changeState(state);
        for (const laterCall of laterCalls) {
          laterCall();
        }
      }
    };

    const getCallback = state => value => {
      if (value instanceof Nancy && state === states.resolved) {
        value.then(value => apply(value, states.resolved));
        value.catch(value => apply(value, states.rejected));
      } else {
        apply(value, state);
      }
    };

    const resolve = getCallback(states.resolved);
    const reject = getCallback(states.rejected);
    changeState(states.pending);
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new Nancy(resolve => resolve(value));
  }

  static reject(value) {
    return new Nancy((_, reject) => reject(value));
  }

  static try(callback) {
    return new Nancy(resolve => resolve(callback()));
  }
}




// Testing

const anything = () => {
  throw new Error('I can be anything because I should never get called!');
};
const throwSomethingWrong = () => {
  console.log('not ignored!');
  throw new Error('Something went wrong...');
};

let p = Nancy.reject(42)
  .catch(value => value) // resolves
  .catch(anything) // ignored
  .catch(anything) // ignored
  .then(value => console.log(value)) // logs 42
  .then(throwSomethingWrong) // logs not ignored!
  .catch(throwSomethingWrong) // logs not ignored!
  .catch(() => 24); // resolves
// p is a Nancy
// p.state is states.resolved
// p.value is 24


const carry = output => input => {
  console.log(input);
  return output;
};

// Chain
p = Nancy.resolve(0)
  .then(carry(1)) // logs 0
  .then(carry(2)) // logs 1
  .then(carry(3)); // logs 2