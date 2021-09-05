const openweather_api = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const appid = "68f13185e001f57e9e0177aecc4d8afb";
export default class ApiWeather {

    constructor(){}

    async getWeather(cityName) {
        return await fetch(openweather_api+'&appid=' + appid + "&q=" + cityName)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error);
        });
    }   
}