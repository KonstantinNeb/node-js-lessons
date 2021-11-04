const http = require('http');
const fs = require('fs');
const path = require('path');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const currentDirectory = process.cwd();

let list;
let dirPath;

rl.question("Please enter the path to the file: ", function(inputedPath) {
  inputedPath = inputedPath;
  dirPath = inputedPath ? path.join(currentDirectory, inputedPath) : currentDirectory;
  list = fs.readdirSync(dirPath);
});

http.createServer((request, response) => {
  if(request.method === 'GET' && request.url !=='/favicon.ico') {

    dirPath = path.join(dirPath, request.url);

    if(fs.lstatSync(dirPath).isFile()) {

      const readStream = fs.readFileSync(dirPath);
      response.writeHead(200, { 'Content-Type': 'text/html'});
      response.end(readStream)

    } else if (request.url !== '/') {

      list = fs.readdirSync(dirPath);

    }

    const html = list.reduce((prevVal, item, ) => prevVal + `<div><a href=${item}>${item}</a></div>`, '')
    response.writeHead(200, { 'Content-Type': 'html'});
    response.end(html);


  } else {
    response.end();
  }
}).listen(3000, 'localhost')