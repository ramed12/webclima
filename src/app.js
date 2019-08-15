// Use Nodemon in the terminal to increase QOL
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static file directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Aplicativo de clima',
        name: 'Andrew Jonasson Mousquer'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        name: 'Andrew Jonasson Mousquer'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        helpText: 'Precisa de ajuda?',
        name: 'Andrew Jonasson Mousquer'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Você deve fornecer um termo de pesquisa'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Você deve fornecer um termo de pesquisa'
        })
    }

    geocode(req.query.address, req.query.day, (err, data={}) => {
        if (err) {
            return console.log(err);
        } 
        forecast(data, (err, forecastData) => {
            if (err) {
                return console.log(err);
            }
            res.send({
                day: forecastData.day,
                temperature: forecastData.temperature,
                location: data.location,
                summary: forecastData.summary,
                icon: forecastData.icon,
                humidity: forecastData.humidity,
                pressure: forecastData.pressure,
                windSpeed: forecastData.windSpeed,
                uvIndex: forecastData.uvIndex
            })
        });
    });


});

// Place error page last because express goes top to bottom when looking for pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        error: 'Artigo de ajuda não encontrado',
        name: 'Andrew Jonasson Mousquer'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        error: 'Page not found.',
        name: 'Andrew Jonasson Mousquer'
    })
});

app.listen(port, () =>{
    console.log(`O servidor está ativo na porta ${port}`)
});


