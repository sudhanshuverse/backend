const fs = require('fs')

// 1. How to create file and add some content to file.

// Sync... create and write some content to file
// fs.writeFileSync('./02-fileHandling/test.txt', 'Hey There');

// Async... create and write some content to file
// fs.writeFile('./02-fileHandling/test.txt', 'Hey There Async', (err) => {})





// 2. How to read content from file.

// Sync... read the file content (It return value)
// const result = fs.readFileSync('./02-fileHandling/test.txt', 'utf-8')
// console.log(result);


// Async... read the file content (It not return value)
// fs.readFile('./02-fileHandling/test.txt', 'utf-8', (err, result) => {
//     if(err) {
//         console.log("Error", err);
//     }else{
//         console.log(result);
//     }
// })





// 3. How to append content to file

// Sync... append some content
// fs.appendFileSync('./02-fileHandling/test.txt', new Date().toLocaleString())

// Async... append some content
// fs.appendFile('./02-fileHandling/test.txt', `\n ${new Date().toLocaleString()}`, (err) => {})





// 4. Copy the file content from one file to another file
// fs.cpSync('./02-fileHandling/test.txt', './02-fileHandling/copyTest.txt')





// 5. Delete the file
// fs.unlinkSync('./02-fileHandling/copyTest.txt')





// 6. To create a folder
fs.mkdirSync('./02-fileHandling/my-docs')