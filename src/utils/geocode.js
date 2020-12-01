const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyc2hhMzE0IiwiYSI6ImNraDIwaHFyZjBhNnQyem14NjYyN3Npam4ifQ.2UZkGV35kTGGHEO372Zj7g'

    request( url, (error,  response ) => {
    const geo=JSON.parse(response.body)
    
     
        if (error) {
            callback('Unable to connect!', undefined)
        } 
        else if(geo.features.length===0){
            callback('Location not found, Enter proper address!', undefined)
        }
        else {
            callback(undefined, 
                geo
            )
        }
    })
}


module.exports = geocode