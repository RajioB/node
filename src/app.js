
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raj Sareen'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Raj Sareen'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Raj Sareen',
        help: 'Some text to talk about help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode(req.query.address, (error, {latitude, longditude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
    
        forecast(latitude, longditude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        });
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Error',
        name: 'Raj Sareen',
        message: 'Help article not found!'
    });
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Raj Sareen',
        message: 'Page Not Found!'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
