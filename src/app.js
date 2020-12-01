const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecasts = require('./utils/forecast')
const geocode = require('./utils/geocode')
const cors = require('cors')


const app = express()
const port=process.env.PORT || 8000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(publicDirectoryPath)
console.log(viewsPath)
console.log(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(cors())

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
   
    if (!req.query.address) {
        return res.send({ error: 'address not provided' })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ temperature: error })
        }
        else{
        forecasts(data.features[0].place_name, (error, response) => {
            if(error){
                return res.send({errordata:error})
            }
           
            res.send({ temperature: response })

        })
    }


    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port.', port)
})