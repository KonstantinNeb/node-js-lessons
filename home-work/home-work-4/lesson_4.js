const colors = require('colors');
const fs = require('fs');
const { Transform } = require('stream');
const { join } = require("path");
const inquirer = require("inquirer");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const currentDirectory = process.cwd();

function changeFile(dirPath) {

  const list = fs.readdirSync(dirPath);

  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Choose file:",
        choices: list,
      },
      {
        name: "searchString",
        type: "input",
        message: "Enter a string to search in the selected file",
      }
    ])
    .then((answer) => {
      console.log(answer.searchString)
      console.log(answer.fileName);
      const filePath = join(dirPath, answer.fileName);

      if(fs.lstatSync(filePath).isFile()) {
        regexp = new RegExp(answer.searchString, 'g')
        const readStream = new fs.ReadStream(filePath, 'utf8');

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            const transformedChunk = chunk.toString().replace(regexp, colors.red(answer.searchString));

            this.push(transformedChunk);

            callback();
          }
        })

        readStream.pipe(transformStream).pipe(process.stdout);
      } else {
        console.log('\x1Bc');
        console.log('it is not file', filePath)
        changeFile(filePath)
      }
    });
}

rl.question("Please enter the path to the file: ", function(inputedPath) {
  const dirPath = inputedPath ? join(currentDirectory, inputedPath) : currentDirectory;
  console.log('\x1Bc');
  changeFile(dirPath);
});