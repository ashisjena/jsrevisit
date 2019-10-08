const localStorage = require('./LocalStorage');

console.log('localStorage length: ' + localStorage.length);

const uid = localStorage.getItem('user_id');

console.log('user_id: ' + uid);

if (!uid) {
  console.log('User id not found. Setting the user id and token');
  localStorage.setItem('token', "AKSDEker2k3SD234SDFSDFsd");
  localStorage.setItem('user_id', "12345");
} else {
  console.log('User id found.', uid);
  console.log('clearing the user id...');
  localStorage.clear();
}