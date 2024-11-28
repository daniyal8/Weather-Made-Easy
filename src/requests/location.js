import axios from "axios";

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

const location = async (cityName, countryCode) => {
    try {
        const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}&limit=10`, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data");
        throw error
    }
}

export default location;
