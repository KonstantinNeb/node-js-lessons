const fs = require('fs');
const PATH_LOG = './access.log';
const readline = require('readline');

const readStream = fs.createReadStream(PATH_LOG, {encoding: 'utf8'});
const writeStream1 = fs.createWriteStream('89.123.1.41_requests.log', {encoding: 'utf8', flags: 'a'});
const writeStream2 = fs.createWriteStream('34.48.240.111_requests.log', {encoding: 'utf8', flags: 'a'});

const rl = readline.createInterface({
  input: readStream,
  terminal: true,
})

const firstIP = '89.123.1.41';
const secondIP = '34.48.240.111';

rl.on('line', (line) => {
  if (line.includes(firstIP)) {
    writeStream1.write(line + "\n")
  }
  if (line.includes(secondIP)) {
    writeStream2.write(line + "\n")
  }
})
