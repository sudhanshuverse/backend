// 1. Read data in the form of chunk and then parse into in readable string
const fs = require('fs');

fs.readFile('sample.txt', (error, data) => {
    console.log(data);
    console.log(data.toString()); 
})
