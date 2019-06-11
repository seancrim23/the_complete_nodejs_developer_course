/**
 * Challenge: work with JSON and the file system
 * 
 * 1. load and parse the JSON data
 * 2. change the name and age property using your info
 * 3. stringify the changed object and overwrite the original data
 * 4. test your work by viewing data in the JSON file
 */
const fs = require('fs');

const buffer = fs.readFileSync('./1-json.json');
const bufferAsString = buffer.toString();
const randomJson = JSON.parse(bufferAsString);

randomJson.name = "Sean";
randomJson.age = 24;

fs.writeFileSync('./1-json.json', JSON.stringify(randomJson));

