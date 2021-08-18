const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { ESRCH } = require('constants')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Duy Anh'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Duy Anh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Duy Anh'

    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Article!',
        name: 'Duy Anh',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address is mandatory'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
            if(error){
                return res.send({
                    error
                })
            }else {
                forecast(latitude, longitude, (error, {temperature} = {}) => {
                    if(error){
                        return res.send({
                            error
                        })
                    }else {
                        return res.send({
                            message: "Nhiet do hien tai o " + location + ' la ' + temperature
                        })
                    }
                })
            }
        })
        
    }
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Duy Anh',
        errorMessage: 'Your page is not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})