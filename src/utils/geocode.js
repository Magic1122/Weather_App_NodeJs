const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFnaWMxMTIyIiwiYSI6ImNrN3EzNWhsNjBkNmwzZm5ydjdib214OGoifQ.ow5QYQ63kuuFgym4VbcanQ&limit=1`

    request({ url, json: true }, (err, resp) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (resp.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
        const { center: coordinates, place_name: location } = resp.body.features[0]
        const latitude = coordinates[1]
        const longitude = coordinates[0]
        callback(undefined, {
            location, longitude, latitude
        })
        }
    })
}

module.exports = geocode