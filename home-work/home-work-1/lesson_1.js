const colors = require('colors');

let n;
let min;

if(process.argv[3]) {
  if (+process.argv[2] > +process.argv[3] ) {
    n = +process.argv[2];
    min = +process.argv[3];
  } else {
    n = +process.argv[3];
    min = +process.argv[2];
  }
} else {
  n = +process.argv[2]
}

if(isNaN(n) || isNaN(min)) return console.log(colors.red('Указаны неверные границы диапазон'));

let simpleNum = [];
let notSimpleNum = [];

for(let i = 2; i <= n; i++) {
  if(notSimpleNum.includes(i)) continue;

  simpleNum.push(i);

  if(i <= Math.sqrt(n)) {
    for(let j = 2; j <= n; j++) {
      notSimpleNum.push(i*j)
    }
  }
}

let results = simpleNum.filter((item) => min <= item)

if(results.length === 0) return console.log(colors.red('В указанном диапазоне нет простых чисел'));

for(let i = 0; i < results.length; i=i+3) {
  console.log(colors.green(results[i]));
  if(results[i+1]) console.log(colors.yellow(results[i+1]));
  if(results[i+2]) console.log(colors.red(results[i+2]));
}
