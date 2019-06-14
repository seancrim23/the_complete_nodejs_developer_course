const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/522264a4230403b214fdef888d9a870d/${latitude},${longitude}`;

    request({ url, json: true }, (error, response) => {
        if(error){
            callback('unable to connect to the weather service!', undefined);
        } else if(response.body.error){
            callback('unable to find location', undefined);
        } else {
            const temperature = response.body.currently.temperature;
            const chanceRain = response.body.currently.precipProbability;
            callback(undefined, {
                forecastData: `It is currently ${temperature} degrees. There is a ${chanceRain}% chance of rain.`
            });
    }
    });
};

module.exports = forecast;