const fs = require('fs');
const chalk = require('chalk');

/**
 * challenge: set up command option and function
 * 
 * 1. setup remove command to take a required --title option.
 * 2. create and export a removeNote function from notes.js
 * 3. call removeNote in remove command handler
 * 4. hav removeNote log the title of the note to be removed
 * 5. test
 */

 /**
  * challenge: wire up removeNote
  * 
  * 1. load existing notes
  * 2. use array filter to remove matching note
  * 3. save new array
  * 4. test
  */

  /**
   * goal: wire up list command
   * 
   * 1. create and export listNotes from notes.js
   *    -'your notes' using chalk
   *    -print note title
   * 2. call listNotes from command header
   * 3. test
   */

/**
 *  goal: wire up read command
 * 
 * 1. setup --title option for read command
 * 2. create readNote in notes.js
 *  - search for note by title
 *  - find note and print title (styled) and body (plain)
 *  - no note found? print error :(
 * 3. have command handler call function
 * 4. test
 */

const getNotes = () => {
    return 'Your notes...';
};

const addNote = (title, body) => {
    let notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote){
        notes.push({
            title,
            body
        });        
        saveNotes(notes);
        console.log(chalk.bgGreen(`New note ${title} added!`));
    } else {
        console.log(chalk.bgRed(`Note title ${title} already taken!`));
    }

};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e) {
        return [];
    }
};

const removeNote = (title) => {
    let notes = loadNotes();
    const filteredTitleArray = notes.filter(note => note.title !== title);

    if(filteredTitleArray.length === notes.length){
        console.log(chalk.bgRed(`Did not find title ${title}!`));
    } else {
        console.log(chalk.bgGreen(`Title ${title} removed! Saving new array...`));
        saveNotes(filteredTitleArray);
    }
};

const listNotes = () => {
    let notes = loadNotes();
    console.log(chalk.blue.underline.bold('Your Notes:'));
    for(let i = 0; i < notes.length; i++){
        console.log(`Note ${i + 1}: ${notes[i].title}`);
    }
};

const readNote = (title) => {
    let notes = loadNotes();
    const desiredNote = notes.find(note => note.title === title);

    if(desiredNote){
        console.log(chalk.blue.underline.bold(`${desiredNote.title}`));
        console.log(desiredNote.body);
    } else {
        console.log(chalk.bgRed(`Title ${title} cannot be found to be read!`));
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
