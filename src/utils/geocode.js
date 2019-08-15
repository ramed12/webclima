const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyCVeIhK0QtZ--Y6VF8XmnSrLfVzPqo4nZs',
    formatter: null
};

const geocoder = NodeGeocoder(options);

const geocode = (address, day, callback) => {
    geocoder.geocode(address, (err, res) => {
        if (err) {
            console.log(err)
            callback('Erro: não é possível conectar-se aos serviços do geocodificador.');
        } else if (res.length === 0) {
            callback('Erro: não foi possível encontrar as coordenadas do endereço.');
        } else {
        const latitude = res[0].latitude;
        const longitude =  res[0].longitude;
        const location = `${res[0].city}, ${res[0].administrativeLevels.level1short}, ${res[0].countryCode}`
        callback(undefined, {
            location,
            latitude,
            longitude,
            day
        })
        }
    });
}

module.exports = geocode;