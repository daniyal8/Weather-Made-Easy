import React from 'react';
import { useSelector } from 'react-redux';
import HealthyIcon from "../assets/healthy.png";
import UnHealthy from "../assets/unhealthy.png";
import ModerateIcon from "../assets/moderate.png";
import DewNormal from "../assets/dewNormal.png";
import DewModerate from "../assets/dewModerate.png";
import DewBad from "../assets/dewBad.png";
import UVIcon from "../assets/uv.png"
import CloudIcon from "../assets/cloud.png"

const WeatherDetails = () => {
    const weatherResult = useSelector((state) => state.weather?.result || {});

    const calculateAQI = (pm25) => {
        if (pm25 <= 12.0) {
            return Math.round(((pm25 - 0) / (12.0 - 0)) * (50 - 0) + 0);
        } else if (pm25 <= 35.4) {
            return Math.round(((pm25 - 12.1) / (35.4 - 12.1)) * (100 - 51) + 51);
        } else if (pm25 <= 55.4) {
            return Math.round(((pm25 - 35.5) / (55.4 - 35.5)) * (150 - 101) + 101);
        } else if (pm25 <= 150.4) {
            return Math.round(((pm25 - 55.5) / (150.4 - 55.5)) * (200 - 151) + 151);
        } else if (pm25 <= 250.4) {
            return Math.round(((pm25 - 150.5) / (250.4 - 150.5)) * (300 - 201) + 201);
        } else if (pm25 <= 500.4) {
            return Math.round(((pm25 - 250.5) / (500.4 - 250.5)) * (500 - 301) + 301);
        }
        return 500;
    };

    const getAQICategory = (aqi) => {
        if (aqi <= 50) {
            return 'Good';
        } else if (aqi <= 100) {
            return 'Moderate';
        } else if (aqi <= 150) {
            return 'Unhealthy for Sensitive Groups';
        } else if (aqi <= 200) {
            return 'Unhealthy';
        } else if (aqi <= 300) {
            return 'Very Unhealthy';
        } else {
            return 'Hazardous';
        }
    };

    const aqi = calculateAQI(weatherResult.current.air_quality.pm2_5);
    const aqiCategory = getAQICategory(aqi);

    const getAQIDetails = () => {
        if (aqiCategory === 'Good') {
            return {
                icon: HealthyIcon,
                label: 'Healthy',
                color: '#19807f',
            };
        } else if (aqiCategory === 'Moderate') {
            return {
                icon: ModerateIcon,
                label: 'Moderate',
                color: '#ffb601',
            };
        } else if (aqiCategory === 'Unhealthy for Sensitive Groups' || aqiCategory === 'Unhealthy') {
            return {
                icon: UnHealthy,
                label: 'Unhealthy',
                color: '#e82e2f',
            };
        } else {
            return {
                icon: UnHealthy,
                label: 'Very Unhealthy',
                color: '#a10d0d',
            };
        }
    };

    const aqiDetails = getAQIDetails();


    const getHumidityDetails = () => {
        const humidity = weatherResult.current.humidity;
        if (humidity <= 50) {
            return {
                icon: DewNormal,
                label: 'Low',
                color: '#19807f'
            };
        } else if (humidity <= 80) {
            return {
                icon: DewModerate,
                label: 'Moderate',
                color: '#ffb601'
            };
        } else {
            return {
                icon: DewBad,
                label: 'High',
                color: '#e82e2f'
            };
        }
    };

    const humidityDetails = getHumidityDetails();

    const getUVDetails = (uvIndex) => {
        if (uvIndex <= 2) {
            return { category: "Low", risk: "Safe", color: "#2b6964" };
        } else if (uvIndex <= 5) {
            return { category: "Moderate", risk: "Caution advised", color: "#feb801" };
        } else if (uvIndex <= 7) {
            return { category: "High", risk: "Harmful", color: "#feb801" };
        } else if (uvIndex <= 10) {
            return { category: "Very High", risk: "Very harmful", color: "#e32f2f" };
        } else {
            return { category: "Extreme", risk: "Extremely harmful", color: "#e32f2f" };
        }
    };

    const uvIndex = Math.round(weatherResult.current.uv);
    const uvDetails = getUVDetails(uvIndex);

    const getCloudCategory = (cloudPercentage) => {
        if (cloudPercentage <= 10) {
            return { label: "Clear", color: "#4CAF50" };
        } else if (cloudPercentage <= 30) {
            return { label: "Mostly Clear", color: "#feb801" };
        } else if (cloudPercentage <= 50) {
            return { label: "Partly Cloudy", color: "#feb801" };
        } else if (cloudPercentage <= 69) {
            return { label: "Mostly Cloudy", color: "#e32f2f" };
        } else {
            return { label: "Overcast", color: "#e32f2f" };
        }
    };

    const cloudDetails = getCloudCategory(weatherResult.current.cloud);



    return (
        <div className='mt-10'>
        <h1 className='text-xl text-white'>Weather details</h1>
        <div className='grid grid-cols-2 gap-12 mt-6 max-[600px]:gap-6 max-[350px]:grid-cols-1'>
            <div className="w-full p-4 rounded-xl border-[#B57EDC] bg-[#222222] border-2 w-full">
                <p className="text-lg text-white">AQI</p>
                <div className="flex items-center flex-col w-full gap-1 mt-3">
                    <img src={aqiDetails.icon} alt={aqiDetails.label} className="w-[80%]" />
                    <p className="text-md text-white">{aqi}</p>
                    <p className="text-md" style={{ color: aqiDetails.color }}>{aqiDetails.label}</p>
                </div>
            </div>
            <div className="w-full p-4 rounded-xl border-[#B57EDC] bg-[#222222] border-2 w-full">
                <p className="text-lg text-white">Humidity</p>
                <div className="flex items-center flex-col w-full gap-8 mt-8">
                    <img className="w-[70%]" src={humidityDetails.icon} alt={humidityDetails.label} />
                    <div className="flex flex-col gap-1 items-center">
                        <p className="text-md text-white text-center">
                            Humidity: {weatherResult.current.humidity}{' '}
                            <span className="text-[#1A7F7F]">%</span> <span style={{ color: humidityDetails.color }}>({humidityDetails.label})</span>
                        </p>
                        <p className="text-md text-white text-center">
                            Dew point: {Math.round(weatherResult.current.dewpoint_c)}{' '}
                            <span className="text-[#1A7F7F]">°</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full p-4 rounded-xl border-[#B57EDC] bg-[#222222] border-2 w-full">
                <p className="text-lg text-white">UV Index</p>
                <div className="flex flex-col items-center gap-4 mt-6">
                    <img className="w-[70%]" src={UVIcon} alt="UV Index" />
                    <p className="text-2xl text-white">{uvIndex}</p>
                    <p className="text-xl" style={{ color: uvDetails.color }}>
                        {uvDetails.category} - {uvDetails.risk}
                    </p>
                </div>
            </div>
            <div className="w-full p-4 rounded-xl border-[#B57EDC] bg-[#222222] border-2 w-full">
                <p className="text-lg text-white">Clouds</p>
                <div className="flex items-center flex-col mt-6">
                    <img className="w-[70%]" src={CloudIcon} alt="Cloud Icon" />
                    <p className="text-xl" style={{ color: cloudDetails.color }}>
                        {cloudDetails.label}
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default WeatherDetails;
