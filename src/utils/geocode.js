const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWljbW9yMTIyNiIsImEiOiJja3JtY2pyN3YwejdxMnBvOXVvcmZrN3g4In0.Lgsc9NdnJntUnexpWrRzfg&limit=1'

    request({ url, json:true }, (err, { body }) => {
        if(err)
        {
            callback('Unable to connect to location services.', undefined);
        }
        else if(body.features.length === 0)
        {
            callback('Invalid location provided to location services.', undefined);
        }
        else
        {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;