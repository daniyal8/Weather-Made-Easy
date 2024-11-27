import React from 'react'
import { useSelector } from 'react-redux'
import PrecipIcon from "../assets/precip.png"

const Forecast = () => {
    const weatherResult = useSelector((state) => state.weather?.result || {});

    return (
        <div className='mt-10'>
            <h1 className='text-xl text-white'>5 day forecast</h1>
            <div className='mt-6'>
                {/* Container for mobile scrolling */}
                <div className='max-[700px]:overflow-x-scroll max-[700px]:whitespace-nowrap'>
                    <div className='flex items-stretch justify-between gap-4 w-full max-[700px]:pb-4'>
                        {weatherResult.forecast?.forecastday?.map((forecast, index) => (
                            <div key={index} className='w-full flex flex-col items-center gap-1 border-2 p-4 rounded-xl border-[#B57EDC] bg-[#222222] max-[700px]:w-[300px]'>
                                <p className='text-xs text-white'>{forecast.date}</p>
                                <img className='w-12' src={forecast.day.condition.icon} alt="weather-icon" />
                                <div className='flex items-center gap-2'>
                                    <p className="text-white text-sm">{Math.round(forecast.day.maxtemp_c)} <span className='text-[#1A7F7F]'>°C</span></p>
                                    <span className='text-[#B57EDC]'>|</span>
                                    <p className="text-white text-sm">{Math.round(forecast.day.mintemp_c)} <span className='text-[#1A7F7F]'>°C</span></p>
                                </div>
                                <p className='text-xs text-white text-center'>{forecast.day.condition.text}</p>
                                <div className='flex items-center gap-2'>
                                    <img className='w-4' src={PrecipIcon} alt="precipitation-icon" />
                                    <p className='text-xs text-white'>{Math.round(forecast.day.daily_chance_of_rain)} <span className='text-[#1A7F7F]'>%</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forecast;
