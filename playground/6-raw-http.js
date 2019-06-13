const https = require('https');

const url = `https://api.darksky.net/forecast/522264a4230403b214fdef888d9a870d/40,-75`;

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        const responseBody = JSON.parse(data);
        console.log(responseBody);
    });
});

request.on('error', (error) => {
    console.log('Error!', error);
});

request.end();
