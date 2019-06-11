/*const fs = require('fs');

fs.writeFileSync('random.txt', 'this file was created by node.js');

/**
 * challenge: append a message to notes.txt
 * 
 * 1. use appendFileSync to append to the file
 * 2. run the script
 * 3. check that what has been appended is in the file
 * 
 */

/*fs.appendFileSync('random.txt', 'hey this is some appended text! hooray!');*/
const utils = require('./utils.js');
const getNotes = require('./notes.js');
const validator = require('validator');
const chalk = require('chalk');

//const name = 'sean';
console.log(utils.name);
console.log(utils.add(2, 3));

/**
 * challenge: define and use a function in a new file
 * 
 * 1. create new file called notes.js
 * 2. create getNotes function that returns 'your notes...'
 * 3. export getNotes function
 * 4. from app.js, load in and call the function printing message to the console
 */

 console.log(getNotes());

 console.log(validator.isEmail('theseancrim@gmail.com'));


 /**
  * challenge: use the chalk library in your project
  * 
  * 1. install version 2.4.1 of chalk
  * 2. load chalk into app.js
  * 3. use it to print "Success!" to console in green
  * 4. test your work
  */

  console.log(chalk.green.bgRed.bold('Woah Nodemon is cool!'));