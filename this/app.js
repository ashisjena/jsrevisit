class NameFiled {
  constructor(name) {
    const field = document.createElement('li');
    field.textContent = name;
    const nameListHook = document.querySelector('#names');
    nameListHook.appendChild(field);
  }
}

class NameGenerator {
  constructor() {
    const btn = document.querySelector('button');
    this.names = ['Rango', 'Django', 'Ram', 'Sita']; // here this attaches the array to the entire class.
    this.currentName = 0;
    console.log('This in constructor :', this);
    // btn.addEventListener('click', addName); // it will search the addName in the constructor or in the global scope. So will fail saying addName is not defined.
    // btn.addEventListener('click', this.addName); here the addName will be called from button so 'this' inside the addName will not be valid and will fail.
    // btn.addEventListener('click', this.addName.bind(this)); // Calling the addName not from button but from NameGenerator
    /* btn.addEventListener('click', function() {
      console.log('This in old function ', this);
      this.addName();
    }); */
    // old way of anonymous function will not work here. Here the addName will be called from button and with error addName is not a function/
    btn.addEventListener('click', () => this.addName());
  }

  addName() {
    console.log('This in addName :', this);
    const name = new NameFiled(this.names[this.currentName]);
    this.currentName++;
    if (this.currentName >= this.names.length) {
      this.currentName = 0;
    }
  }
}

const gen = new NameGenerator();
