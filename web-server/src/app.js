const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//console.log(__dirname);
//console.log(__filename);

//console.log(path.join(__dirname, '../public'));
//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sean Crim'
    });
});

/*app.get('', (req, res) => {
    res.send(`<h1>yoooooooooooooooo</h1>
    <a href="./help">help</a>
    <a href="./about">about</a>
    <a href="./weather">weather</a>`);
});
dont need this since we have app.use serving up index.html
*/

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hey this is your help message!',
        title: 'Help Page!',
        name: 'Sean Crim'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sean Crim'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Error! Please provide an address!'
        });
    }

        //console.log(req.query.address);
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, { forecastData }) => {
                if(error){
                    return res.send({ error });
                }

                res.send({
                    location,
                    forecastData
                });
            });

        });
});

/*app.get('/products', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'Error! Please provide an address!'
        });
    } else {
        console.log(req.query.address);
        geocode(req.query.address, (error, {latitude, longitude, location}) => {
            if(error){
                console.error('Error!', error);
            }
            forecast(latitude, longitude, (error, {temperature, chanceRain}) => {
                if(error){
                    console.error('Error!', error);
                }

                res.send({
                    location,
                    temperature,
                    chanceRain,
                    forecast: `It is currently ${temperature} degrees out. There is a ${chanceRain}% chance of rain.`
                });
            });

        });
    }   
});*/

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found!',
        name: 'Sean Crim',
        title: 'Help 404 page'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        name: 'Sean Crim',
        title: 'Standard 404 page'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});

// app.com
// app.com/help
// app.com/about
/**
 * goal1: setup two new routes
 * 
 * 1. setup an about route and render a page title
 * 2. setup a weather route and render a page title
 * 3. test
 * 
 */
/**
 * goal2: update routes
 * 
 * 1. setup about route to render title with HTML
 * 2. setup weather route to send back JSON
 *      -object with forecast and location strings
 * 3. test
 */

 /**
  * goal3: create a template for help page
  * 
  * 1. setup help template to render a help message to screen
  * 2. setup the help route and render template with example message
  * 3. visit route in browser and see help message print
  */
 /**
  * goal4: create partial for the footer
  * 
  * 1. setup template for footer partial (created by {{name}})
  * 2. render partial at bottom of all pages
  * 3. test
  */

  /**
   * goal5: create and render a 404 page with handlebars
   * 
   * 1. setup template to render header and footer
   * 2. setup template to render error message in p
   * 3. render template for both 404 routes
   *    - page not found.
   *    - help article not found
   * 4. test
   */

  /**
   *goal6: update weather endpoint to accept address
   
   1. No address? send back error message
   2. address? send back static json
        -add address property onto JSON which returns the provided address
    3. test
   */

   /**
    * goal7: wire up /weather
    *  
    * 1. require geocode/forecast into app.js
    * 2. use address to geocode
    * 3. use coordinates to get forecast
    * 4. send back forecast and location
    */