var obj1 = {
  k1: 'v1',
  k2: 'v2',
  fn: function (arg1, arg2) {
    console.log(this.k1, this.k2)
    console.log(arg1, arg2)
  }
};

//a normal `method` call
obj1.fn(1, 2);


var obj2 = {
  k1: 'v3',
  k2: 'v4'
}

//the `call` flow
var letUsCall = obj1.fn

letUsCall.call(obj2)

letUsCall.call(obj2, 3)

letUsCall.call(obj2, 3)

letUsCall.call(obj2, 3, 4)

letUsCall.call(obj2, 3, 4, 5, 6)



//the `apply` flow
var letUsApply = obj1.fn

letUsApply.apply(obj2)

letUsApply.apply(obj2, [])

letUsApply.apply(obj2, [3])

letUsApply.apply(obj2, [3, 4])

letUsApply.apply(obj2, [3, 4, 5, 6])



//let us sprinkle some `bind` here
var obj3 = {
  k1: 'v1',
  k2: 'v2',
  fn: function (arg1, arg2) {
    console.log(this.k1, this.k2)
    console.log(arg1, arg2)
    console.log('');
  }.bind(obj1)
}
console.log("Bind Magic");
obj3.fn(10, 20)

var letUsBind = obj3.fn

letUsBind.call(obj2, 3, 4)

letUsBind.apply(obj3, [5, 6])