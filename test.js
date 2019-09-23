(() => {
  var helloworld = 'Hello, World';
  console.log(helloworld);
})();

function MONAD() {
  var prototype = Object.create(null);

  function unit(value) {
    var monad = Object.create(prototype);

    monad.bind = (func, args) => {
      return func(value, ...args);
    };

    return monad;
  };

  unit.lift = (func, name) => {
    prototype[name] = (...args) => {
      return unit(this.bind(func, args));
    };

    return unit;
  };

  return unit;
}

console.log(MONAD());
