const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY29vbHNlYW40MiIsImEiOiJjand0b3Q2angyanA4NDNxbXZrODMyMjU4In0.y-8FVtdcJnFeR1KPsCcW0A&limit=1`;

    request({ url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services.', undefined);
        } else if (response.body.features.length === 0) { 
            callback('No results found! Try another search!', undefined);
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    }); 
};

module.exports = geocode;