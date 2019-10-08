const ScoutPrototype = require('./ScoutPrototype');

const alex = ScoutPrototype.clone();
alex.name = 'Alex Banks';
alex.addItemsToList('slingshot');


const eve = ScoutPrototype.clone();
eve.name = 'Eve Porcello';
eve.addItemsToList('reading light');

console.log(`${alex.name}: ${alex.shoppingList}`);
console.log(`${eve.name}: ${eve.shoppingList}`);