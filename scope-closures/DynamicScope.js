function foo() {
  var a = 2;

  function bar() {
    console.log(a); // 2
  }

  bar();
}

foo();
/******************************/
function fooz() {
  var a = 3;

  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = fooz();
baz(); // 2 -- Whoa, closure was just observed.
/*********************************/

function fooq() {
  var a = 5;

  function baz() {
    console.log(a);
  }

  bar(baz);
}

function bar(func) {
  func(); // Look, I saw closure
}

fooq();

function ffoo() {
  console.log(a);
}

function bbar() {
  var a = 3;
  ffoo();
}

var a = 10;
bbar();
