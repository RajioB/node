const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFqaW8iLCJhIjoiY2tkZzNyMXZmMmpiazJ5azYwbzZ4NWxpbSJ9.YN11rIPfTwi-bdmqkXTuOQ&limit=1'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapping service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location name', undefined);
        } else {
            callback(undefined, data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;