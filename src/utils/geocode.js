const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmdvZHV5YW5oIiwiYSI6ImNrc2NucXozcDBldjMyb3BjMWpxcGFyeWIifQ.1NiMM_mXwgxX68KQtkX7WQ&language=vi&limit=1'
    request({ url,json:true }, (error, {body}={}) => {
        if(error){
            callback('cannot connect to geocoding server', undefined)
        }else if(body.message || body.features.length == 0){
            callback('cannot connect to find location', undefined)
        }else {
            const data = body.features
            callback(null, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode