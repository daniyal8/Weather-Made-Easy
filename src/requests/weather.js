import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = async (city) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`)
        return response.data
    } catch (error) {
        console.error("error fetching weather");
        throw error
    }
}
export default Weather
