const request = require('request');


//const address = 'https://api.mapbox.com/geocoding/v5/mapbox.places/losangeles.json?access_token=pk.eyJ1IjoiYW55Yml6Y2xvdWQiLCJhIjoiY2tpcGUyNWR5MWxuMDJ5cGs4ZDI4ZjMybCJ9.tr1WH-oaGKzp94jlnl2BBw';



const geocode = (address, callback) => {

    
    if (typeof address == Object) {
        var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW55Yml6Y2xvdWQiLCJhIjoiY2tpcGUyNWR5MWxuMDJ5cGs4ZDI4ZjMybCJ9.tr1WH-oaGKzp94jlnl2BBw`
    } else {
        var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW55Yml6Y2xvdWQiLCJhIjoiY2tpcGUyNWR5MWxuMDJ5cGs4ZDI4ZjMybCJ9.tr1WH-oaGKzp94jlnl2BBw';
        
    }
    
    request({url: url, json: true}, (error, response) => {
        const {center, place_name} = response.body.features[0] || {};
        if (error) {
            callback('Unable to connect to location services!');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search!');
        } else {
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode;