const fs = require('fs');
const es = require('event-stream');
const endOfLine = require('os').EOL;

const inputPath = process.argv[2];
const resultPath = process.argv[3] ? process.argv[3] : 'result.json';
readFirstLine(inputPath)
	.then(
		metaData => {
			return new Promise((resolve, reject) => {
				const resultMap = {};
				let noOfLine = 0;
				metaData = metaData.split(',');
				fs.createReadStream(inputPath, { encoding: 'utf8' })
					.pipe(es.split())
					.pipe(
						es.mapSync(line => {
							const addr = line.split(',');
							const cityState = addr[metaData.indexOf('city__state')];
							if (noOfLine === 0 || !cityState) {
								noOfLine++;
								return;
							}

							let cityStateArr;
							if (resultMap[cityState]) {
								cityStateArr = resultMap[cityState];
							} else {
								cityStateArr = [];
								resultMap[cityState] = cityStateArr;
							}
							addToResultMap(cityStateArr, addr, metaData);
						})
					)
					.on('close', () => {
						console.log('Read & Parsing completed');
						resolve(resultMap);
					})
					.on('error', err => {
						console.error('Error occurred while reading file: ', err);
						reject(err);
					});
			});
		},
		err => {
			throw new Error(err);
		}
	)
	.then(
		result => {
			fs.writeFile(resultPath, JSON.stringify(result, null, '\t'), 'utf8', err => {
				if (err) {
					throw err;
				}
				console.log('Write Completed');
			});
		},
		err => {
			throw new Error(err);
		}
	)
	.catch(err => {
		console.error(err);
	});

function addToResultMap(cityStateArr, addr, metaData) {
	let index = 0;
	cityStateArr.push(
		addr.reduce((acc, fieldName) => {
			acc[metaData[index++]] = fieldName;
			return acc;
		}, {})
	);
}

function readFirstLine(path) {
	return new Promise((resolve, reject) => {
		if (!path) {
			reject('Input file path is empty');
		}
		let rs = fs.createReadStream(path, { encoding: 'utf8' });
		let acc = '';
		let pos = 0;
		let index;
		rs.on('data', chunk => {
			index = chunk.indexOf(endOfLine);
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
