const fs = require('fs');

const testFolder = 'C:/React 16.6-The_Complete_Guide (incl. React Router & Redux) by Maximilian Schwarzmüller';

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(files[i]);
    }
  }
  return files_;
}

console.log(getFiles(testFolder).sort().forEach((file, index) => {
  let fileName = parseInt(file.slice(0, file.indexOf("-")));
  if(fileName !== index + 1){
    console.log(fileName);
  }
}));
