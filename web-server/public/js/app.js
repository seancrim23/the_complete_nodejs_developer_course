console.log('hello world');

/**
 * goal: fetch weather
 * 
 * 1. setup call to fetch weather boston
 * 2. get parsed json response
 *      -if error property, print error
 *      - if no error property, print location and forecast
 * 3. test
 */

/*fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data);
    });
});*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('.message__one');
const messageTwo = document.querySelector('.message__two');


weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const address = search.value;

    messageOne.textContent = 'Loading results...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${address}`).then(response => {
    response.json().then(data => {
        if(data.error){
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecastData;
        }
        });
    });
    document.querySelector('input').value = '';
});

/**
 * goal: use the input value to get weather
 * 
 * 1. migrate fetch call into the submit callback
 * 2. use search text as address query string value
 * 3. submit form with valid and invalid value to test
 */

 /**
  * goal2: rendering content to paragraphs
  * 
  * 1. select second message p
  * 2. just before fetch, render loading message and empty p
  * 3. if error, render error
  * 4. if no error, render location and forecast
  * 5. test
  */