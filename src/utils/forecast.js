const request = require('request')

forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/5bf8d10a5d3af434e4976d3ccc624f95/${latitude},${longitude}?units=si`

    request({ url, json: true }, (err, resp) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (resp.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const { temperature, precipProbability } = resp.body.currently
            const { summary, temperatureHigh, temperatureLow } = resp.body.daily.data[0]
            callback(undefined, `${summary} It is currently ${temperature} degrees out. Today the lowest temperature will be ${temperatureLow} degrees and the highest temperature will be ${temperatureHigh} degrees. There is ${precipProbability}% chance of rain.`)
        }

    })

}

module.exports = forecast