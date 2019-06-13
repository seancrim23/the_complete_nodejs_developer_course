const express = require('express');
const path = require('path');
const hbs = require('hbs');

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
    res.send({
        forecast: 'cloudy',
        location: 'Delaware',
        title: 'Weather Page'
    });
});

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