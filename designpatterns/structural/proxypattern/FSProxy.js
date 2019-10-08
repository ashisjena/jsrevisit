class FSProxy {

  constructor(fs) {
    this._fs = fs;
  }

  readFile(path, format, callback) {
    if (!path.match(/.md$|.MD$/)) {
      return callback(new Error('Can only read Markdown files.'));
    }

    this._fs.readFile(path, format, (error, contents) => {
      if (error) {
        console.error(error);
        return callback(error);
      }

      return callback(null, contents);
    });
  }

  writeFile() {

  }

  appendFile() {

  }
}

module.exports = FSProxy;