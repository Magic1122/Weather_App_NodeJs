const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express();
const port = process.env.PORT  || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Balint Bakos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Balint Bakos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Balint Bakos',
        msg: 'This is my help page.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({                           // use return to stop the code running and don't make a double request
            error: 'You must provide an address.'
        })
    }


    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }

        const { latitude, longitude, location } = data  // you can also destructure in the params but then u need to set default value to an empty obj in order to awoid crashing when a non valid value is provided in the search query

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: data,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({                  // use return to stop the code running and don't make a double request
            error: 'You must provide a sarch term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        msg: 'Help article not found.',
        name: 'Balint Bakos'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        msg: 'Page not found.',
        name: 'Balint Bakos'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
