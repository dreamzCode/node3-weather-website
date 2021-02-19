const request = require("request");

// const url = 'http://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=fb4770d6a7991f370cff785ac4eb36dd&units=metric'

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=fb4770d6a7991f370cff785ac4eb36dd&units=metric';

    request({url: url, json: true}, (error, response) => {
        const {message, main, weather} = response.body;
         if (error) {
             callback('Unable to connect to Weather Services!');
         } else if (message) {
             callback('Unable to find location!');
         } else {
             console.log(main)
             const data = `Today's Temperature is ${main.temp} and the weather is ${weather[0].main}.`
             const tempRange = `Today's Maximum Temperature is ${main.temp_max} and Minimum Temperature is ${main.temp_min}`
             callback(undefined, data, tempRange )
         }
    })
}
module.exports = forecast