const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dbb6206fda26387966af7b449d8bf261&query=' + latitude +',' +longitude 
    request({ url,json:true},(error,{body})=> {
    

    if (error) {

        callback('Unable to connect to weather service!',undefined)
    } else if (body.error) {
        callback('Unable to find location',undefined)
    }
    else {
    callback(undefined, {
        weather_descriptions : body.current.weather_descriptions[0],
        temperature : body.current.temperature
    } )
    
}
})

}

module.exports = forecast