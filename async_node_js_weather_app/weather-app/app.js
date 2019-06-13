const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//const url = 'https://api.darksky.net/forecast/522264a4230403b214fdef888d9a870d/37.8267,-122.4233';


/**
 * challenge: print small forecast to user
 * 
 * 1. print: "it is current 58.55 degrees out. there is a 0% chance of rain."
 * 2. test
 */
/*request({ url: url, json: true }, (error, response) => {
    if(error){
        console.log('unable to connect to the weather service!');
    } else if(response.body.error){
        console.log('unable to find location');
    } else {
        console.log(`It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`);
    }
});

/**
 * challenge: print lat and long for Los Angeles
 * 
 * 1. fire off a new request to the URL explored in browser
 * 2. have request request parse as JSON
 * 3. print both latitude and longitude to terminal
 * 4. test
 */
/*const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY29vbHNlYW40MiIsImEiOiJjand0b3Q2angyanA4NDNxbXZrODMyMjU4In0.y-8FVtdcJnFeR1KPsCcW0A&limit=1';

request({ url: geoUrl, json: true }, (error, response) => {
    console.log(`Latitude: ${response.body.features[0].center[0]} Longitude: ${response.body.features[0].center[1]}`);
});*/

/**
 * challenge: create a reusable function for gettting the forecast
 * 
 * 1. setup the forecast function in forecast.js
 * 2. require function in app.js and call it as below
 * 3. forecast should have 3 potential calls to callback
 */

 /**
  * goal: use destructuring and property shorthand in weather app
  * 
  * 1. use destructuring in app.js, forecast, geocode
  * 2. use property shorthand in forecast and geocode
  * 3. test
  */

const address = process.argv[2];

if(!address){
    console.log('Please enter an address!');
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if(error){
            return console.log(error);
        }
        forecast(latitude, longitude, (error, { temperature, chanceRain }) => {
            if(error){
                return console.log(error);
            }

            console.log(location);
            //console.log('Data', forecastData);
            console.log(`It is currently ${temperature} degrees out. There is a ${chanceRain}% chance of rain.`);
        });
    });
}


