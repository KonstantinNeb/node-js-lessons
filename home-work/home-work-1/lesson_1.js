const colors = require('colors');

const getSimpleNum = (min, n) => {
  if (isNaN(n) || isNaN(min)) return console.log('Аргумент не является числом');

  for (let i = 2; i <= n; i++) {
    let flag = 1;
    if (i > 2 && i % 2 !== 0)
    {
      for (let j = 3; j * j <= i ; j = j + 2)
      {
        if (i % j === 0)
        {
          flag = 0;
          break;
        }
      }
    }
    else if (i !== 2) flag = 0;
    if (flag === 1) {

      let simpleNum = [];
      let notSimpleNum = [];

      for (let i = 2; i <= n; i++) {
        if (notSimpleNum.includes(i)) continue;

        simpleNum.push(i);

        if (i <= Math.sqrt(n)) {
          for (let j = 2; j <= n; j++) {
            notSimpleNum.push(i*j)
          }
        }
      }

      let results = simpleNum.filter((item) => min <= item);

      if (results.length === 0) return console.log(colors.red('В указанном диапазоне нет простых чисел'));

      for (let i = 0; i < results.length; i = i + 3) {
        console.log(colors.green(results[i]));
        if (results[i + 1]) console.log(colors.yellow(results[i + 1]));
        if (results[i + 2]) console.log(colors.red(results[i + 2]));
      }
      break;
    }
  }
}

getSimpleNum();
