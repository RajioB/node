const request = require('request');

const forecast = (longditude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=15a0aebaca186be74799381135a3dcb2&query=' + latitude + ',' + longditude +'&units=F'
    //console.log(url);
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The cloud cover is ' + body.current.cloudcover +'%';
            callback(undefined, data);
        }
    });
}

module.exports = forecast;