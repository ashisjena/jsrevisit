const fs = require('fs');

function readFirstLine(path) {
	return new Promise((resolve, reject) => {
		let rs = fs.createReadStream(path, { encoding: 'utf8' });
		let acc = '';
		let pos = 0;
		let index;
		rs.on('data', chunk => {
			index = chunk.indexOf('\n');
			acc += chunk;
			index !== -1 ? rs.close() : (pos += chunk.length);
		})
			.on('close', () => {
				resolve(acc.slice(0, pos + index));
			})
			.on('error', err => {
				reject(err);
			});
	});
}

readFirstLine('./laxmi/laxmi.csv').then(rs => {
	console.log('Read line');
	console.log(rs);
	return rs;
});
