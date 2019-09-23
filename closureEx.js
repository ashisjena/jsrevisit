function showName(firstName, lastName) {
  var nameIntro = 'Your name is ';
  // this inner function has access to the outer function's variables, including the parameter
  function makeFullName() {
    return nameIntro + firstName + ' ' + lastName;
  }

  return makeFullName();
}

console.log(showName('Michael', 'Jackson')); // Your name is Michael Jackson

// Closures store references to the outer function’s variables
function celebrityID() {
  var celebrityID = 999;
  // We are returning an object with some inner functions
  // All the inner functions have access to the outer function's variables
  return {
    getID: function() {
      // This inner function will return the UPDATED celebrityID variable
      // It will return the current value of celebrityID, even after the changeTheID function changes it
      return celebrityID;
    },
    setID: function(theNewID) {
      // This inner function will change the outer function's variable anytime
      celebrityID = theNewID;
    }
  };
}

var mjID = celebrityID(); // At this juncture, the celebrityID outer function has returned.
mjID.getID(); // 999
mjID.setID(567); // Changes the outer function's variable
mjID.getID(); // 567: It returns the updated celebrityId variable

function celebrityIDCreatorBuggy(theCelebrities) {
  var i;
  var uniqueID = 100;
  for (i = 0; i < theCelebrities.length; i++) {
    theCelebrities[i]['id'] = function() {
      return uniqueID + i;
    };
  }

  return theCelebrities;
}
/*   In the preceding example, by the time the anonymous functions are called, the value of i is 3 (the length of the array and then it increments). The number 3 was added to the uniqueID to create 103 for ALL the celebritiesID. So every position in the returned array get id = 103, instead of the intended 100, 101, 102.
 *  The reason this happened was because, as we have discussed in the previous example, the closure (the anonymous function in this example) has access to the outer function’s variables by reference, not by value. So just as the previous example showed that we can access the updated variable with the closure, this example similarly accessed the i variable when it was changed, since the outer function runs the entire for loop and returns the last value of i, which is 103.
 *  To fix this side effect (bug) in closures, you can use an Immediately Invoked Function Expression (IIFE), such as the following: */

function celebrityIDCreator(theCelebrities) {
  var i;
  var uniqueID = 100;
  for (i = 0; i < theCelebrities.length; i++) {
    theCelebrities[i]['id'] = (function(j) {
      // the j parametric variable is the i passed in on invocation of this IIFE
      return (function() {
        return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array
      })(); // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.
    })(i); // immediately invoke the function passing the i variable as a parameter
  }

  return theCelebrities;
}

var actionCelebs = [{ name: 'Stallone', id: 0 }, { name: 'Cruise', id: 0 }, { name: 'Willis', id: 0 }];

var createIdForActionCelebsBuggy = celebrityIDCreatorBuggy(actionCelebs);
var stalloneIDBuggy = createIdForActionCelebsBuggy[0];
console.log(stalloneIDBuggy.id()); // 103

var createIdForActionCelebs = celebrityIDCreator(actionCelebs);
var stalloneID = createIdForActionCelebs[0];
console.log(stalloneID.id); // 100
var cruiseID = createIdForActionCelebs[1];
console.log(cruiseID.id); // 101

/* Function factories
One powerful use of closures is to use the outer function as a factory for creating functions that are somehow related.
 */
function dwightJob(title) {
  return function(prefix) {
    return prefix + ' ' + title;
  };
}

var sales = dwightJob('Salesman');
var manager = dwightJob('Manager');

console.log(sales('Top')); // Top Salesman
console.log(manager('Assistant to the Regional')); // Assistant to the Regional Manager
console.log(manager('Regional')); // Regional Manager

/* Namespacing private functions
Many object-oriented languages provide the ability to declare methods as either public or private. 
JavaScript doesn’t have this functionality built in, but it does allow to emulate this functionality through the use of closures, 
which is known as the module pattern.
 */
var dwightSalary = (function(salary) {
  function changeBy(amount) {
    salary += amount;
  }
  return {
    raise: function() {
      changeBy(5000);
    },
    lower: function() {
      changeBy(-5000);
    },
    currentAmount: function() {
      return salary;
    }
  };
})(60000);

console.log(dwightSalary.currentAmount()); // $60,000
dwightSalary.raise();
console.log(dwightSalary.currentAmount()); // $65,000
dwightSalary.lower();
dwightSalary.lower();
console.log(dwightSalary.currentAmount()); // $55,000

dwightSalary.changeBy(10000); // TypeError: undefined is not a function

/* Using closures to namespace private functions keeps more general namespaces clean, preventing naming collisions. Neither the salary variable nor the changeBy function are available outside of dwightSalary. However, raise, lower and currentAmount all have access to them and can be called on dwightSalary. */
