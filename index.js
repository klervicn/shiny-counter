const readline = require('readline');
const path = require('path');
const fs = require('fs');
const countPath = path.join(__dirname, 'data', 'count.txt');
let count = 0;
try { count = parseInt(fs.readFileSync(countPath, { encoding : 'utf8' }));}
catch {
  console.log("File will be created automatically in data folder")
  fs.writeFileSync(countPath, count.toString(), { encoding : 'utf8' })
}

function write() {
  fs.writeFileSync(countPath, count.toString(), { encoding : 'utf8' })
  console.log('Count : ', count);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key.ctrl && key.name === 'r') {
    count = 0;
    write()
  }
  else if (key.ctrl && key.name === 'd') {
    count --;
    write()
  }
  else {
    count ++;
    write()
  }
});
console.log('Press ctrl + c to quit');
console.log('Press ctrl + r to reset count');
console.log('Press ctrl + d to decrement');
console.log('Press any other key to increment');