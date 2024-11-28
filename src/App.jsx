import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationResult, locationSearch, locationSelected } from "./features/locationSlice";
import location from "./requests/location";
import Weather from "./requests/weather";
import { weatherResult } from "./features/weatherSlice";
import { AutoComplete } from 'antd';
import WeatherCard from "./components/weatherCard";
import logo from "./assets/logo.png"
import Forecast from "./components/forecast";
import WeatherDetails from "./components/weatherDetails";
import Footer from "./components/footer";

function App() {
  const locationSearchValue = useSelector((state) => state.location.value);
  const locationSearchResults = useSelector((state) => state.location.result);
  const selectedLocation = useSelector((state) => state.location.selectedValue);
  const temp = useSelector((state) => state.weather?.result || {});
  console.log(temp);

  const dispatch = useDispatch();

  const timeoutRef = useRef(null);

  const handleSearch = (value) => {
    dispatch(locationSearch(value));
  };

  useEffect(() => {
    if (locationSearchValue) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        location(locationSearchValue)
          .then((data) => {
            dispatch(locationResult(data));
          })
          .catch((err) => {
            console.error("error fetching results", err);
          });
      }, 500);
    }
  }, [locationSearchValue, dispatch]);

  useEffect(() => {
    if (selectedLocation) {
      Weather(selectedLocation)
        .then((data) => {
          dispatch(weatherResult(data));
        })
        .catch((err) => {
          console.error("Error fetching weather:", err);
        });
    }
  }, [selectedLocation, dispatch]);

  const handleSelectChange = (value) => {
    dispatch(locationSelected(value));
  };

  const options = locationSearchResults?.data?.length > 0
    ? locationSearchResults.data.map((city) => ({
        value: `${city.name}, ${city.countryCode}`,
        label: `${city.name}, ${city.countryCode}`,
    }))
    : [];

    return (
      <div className="w-full min-h-screen flex flex-col bg-[#121212]">
        {/* Content wrapper */}
        <div className="flex-grow flex items-center justify-center py-10">
          <div className="w-[45%] max-[1650px]:w-[50%] max-[1534px]:w-[55%] max-[1180px]:w-[60%] max-[1070px]:w-[80%] max-[800px]:w-[90%]">
            {Object.keys(temp).length > 0 ? (
              <div className="w-full">
                <AutoComplete
                  style={{ width: '100%', height: '3rem' }}
                  options={options}
                  placeholder="Take me to your favorite city forecast!"
                  onSearch={handleSearch}
                  onSelect={handleSelectChange}
                  filterOption={false}
                />
                <div className="mt-10">
                  <WeatherCard />
                  <Forecast />
                  <WeatherDetails />
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-8">
                <img className="w-[25%] max-[600px]:w-[50%]" src={logo} alt="Logo" />
                <p className="text-white text-xl text-center">
                  Weather Made Simple—From{' '}
                  <span className="text-[#B57EDC]">Drizzles</span> to{' '}
                  <span className="text-[#B57EDC]">Downpours!</span>🌤️☔
                </p>
                <AutoComplete
                  style={{ width: '100%', height: '3rem' }}
                  options={options}
                  placeholder="Enter Your City"
                  onSearch={handleSearch}
                  onSelect={handleSelectChange}
                  filterOption={false}
                />
              </div>
            )}
          </div>
        </div>
    
        {/* Sticky Footer */}
        <Footer />
      </div>
    );
    
}

export default App;
