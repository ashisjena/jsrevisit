const person = {
  name: 'Ashis',
  age: 29,
  job: 'Programmer',
  greet() {
    console.log(this.name);
  }
};

const printName = ({ name, age }) => {
  console.log(name, age);
};
printName(person);

const { name, job } = person;
console.log(name, job);

const names = ['Ram', 'Shyam', 'Sita'];
const [name1, name2] = names;
console.log(name1, name2);
