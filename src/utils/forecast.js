const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6b06afa62657827184f1562cbe2566e&query='+latitude+','+longitude+'&units=m'
    request({ url,json:true }, (error, {body} = {}) => {
        if (error) {
            callback('Canoot connect to server', undefined)
           console.log()
        }else if(body.error){
            callback('unable to find location', undefined)
            console.log()
        }else {
            const map = body
            callback(undefined, {
                temperature: map.current.temperature
            })
        }
    })
}

module.exports = forecast