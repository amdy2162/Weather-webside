const request = require("request")

const forcecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=04e43abda8751f3fa121ffe4f0b82b2a&query='+ latitude + ',' + longitude + '&units=f';
    // console.log(url);
   request({url, json: true}, (error, { body } = {}) => {
    // console.log(response.body);
        if(error){
            callback('Unable to connet to location services.', undefined);
        } else if(body.error){
            callback('Unable to find location. Try another search, undefined');
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }    
   })

}

module.exports = forcecast;