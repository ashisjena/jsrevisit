const obj = { ram: 1, shyam: 2 };

/* const map = new Map(Object.entries(obj));
console.log(map);

for (const [key, value] of map.entries()) {
  console.log(key);
  console.log(value);
} */

/* function prom() {
	return Promise.reject(new Error('Error Occurred'));
}

prom().catch(err => {
	console.log('Error during prom call');
	console.log(err);
}); */


const authData = {email: 'ram@gmail.com', name: 'ram', password: 'abc'};
const graphqlQuery = `
			mutation{
				createUser(userInput:{email: "${authData.email}", name: "${authData.name}", password:"${authData.password}"}){
					id
					email
				}
			}
		`;
console.log(JSON.stringify(graphqlQuery));
console.log(JSON.parse(JSON.stringify(graphqlQuery)));