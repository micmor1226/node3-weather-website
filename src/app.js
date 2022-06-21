const path = require('path');
const express = require('express');
const hbs = require('hbs');
//const request = require('postman-request');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mike Morse'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Morse'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is your help message.',
        name: 'Mike Morse'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'An address must be provided'
        })
    }
    
    const location = req.query.address;

    geocode(location, (err, {lat, long, location} = {}) => {
        if(err)
        {
            return res.send({
                error: err
            });
        }

        forecast(lat, long, (err, forecastData) => {
            if(err)
            {
                return res.send({
                    error: err
                });
            }
            res.send({
                location: location,
                forecastData: forecastData
            });
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'The help article you are looking for can not be found. Sorry.',
        name: 'Mike Morse'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'We are sorry but the page you are trying to access is not available.',
        name: 'Mike Morse'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000.');
}) //Dev port
