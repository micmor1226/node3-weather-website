const request = require('postman-request');

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=602ff4e73db3ca5208d7ba85fd0bc758&query=' + lat + ',' + long + '&units=f';

    request({
        url,
        json:true
    }, (err, { body }) => {
        if(err)
        {
            callback('Unable to connect to weather service.', undefined);
        }
        else if(body.error)
        {
            callback('Unable to find location.', undefined);
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. ' + 'It feels like ' + body.current.feelslike + ' degrees out.');
        }
    })
}

module.exports = forecast;