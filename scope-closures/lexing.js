// Cheating Lexical
// use of eval() and with() slows down javascript performance.
// The downside to these mechanisms is that it defeats the engine's ability to perform compile-time optimizations regarding scope look-up, because the engine has to assume pessimistically that such optimizations will be invalid. Code will run slower as a result of using these features or functions. 
// 'use strict';

function foo(str, a) {
  eval(str); // cheating!
  console.log(a, b);
}

var b = 2;

foo('var b = 3;', 1);

function foo2(obj) {
  with(obj) {
    a = 2;
  }
}

var o1 = { a: 3 };
var o2 = { b: 3 };

foo2(o1);
console.log(o1.a); // 2

foo2(o2);
console.log(o2.a); // undefined
// console.log(a); // Oops leaked global!
