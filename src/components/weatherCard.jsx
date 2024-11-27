import React from 'react';
import { useSelector } from 'react-redux';
import HumidityIcon from "../assets/humidityIcon.png"
import PressureIcon from "../assets/pressureIcon.png"
import WindIcon from "../assets/wind.png"
import PrecipIcon from "../assets/precip.png"

const WeatherCard = () => {
    const weatherResult = useSelector((state) => state.weather?.result || {});

    return (
        <div>
            <div className='bg-[#222222] rounded-2xl py-6 px-8 border-2 border-[#B57EDC]'>
                <p className='text-white text-md'>{weatherResult.location.name}, {weatherResult.location.country}</p>
                <p className='text-[#1A7F7F] text-sm'>Current</p>
                <div className='flex items-center justify-between mt-6 max-[500px]:flex-col'>
                    <div className='flex items-center gap-1'>
                        <img className='w-24 mt-2' src={weatherResult.current.condition.icon} />
                        <div className='flex items-start gap-1'>
                            <h1 className='text-6xl font-bold text-white'>{Math.round(weatherResult.current.temp_c)}</h1>
                            <span style={{ marginTop: '-50px !important' }} className='text-3xl text-[#1A7F7F]'>&deg;C</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 max-[500px]:items-center'>
                        <p className='text-2xl text-white'>{weatherResult.current.condition.text}</p>
                        <p className='text-md text-white'>Feels like <span>{Math.round(weatherResult.current.feelslike_c)}<span className='text-[#1A7F7F] text-sm'>°C</span></span></p>
                    </div>
                </div>
                <div className='flex items-center justify-between mt-20 max-[560px]:flex-wrap max-[560px]:gap-5'>
                    <div className='flex items-center gap-3'>
                        <img className='w-12' src={WindIcon} />
                        <div className='flex flex-col gap-1'>
                            <p className='text-xs text-white'>Wind</p>
                            <p className='text-lg text-white'>{Math.round(weatherResult.current.wind_kph)} <span className='text-[#1A7F7F]'>km/h</span></p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-12' src={HumidityIcon} />
                        <div className='flex flex-col gap-1'>
                            <p className='text-xs text-white'>Humidity</p>
                            <p className='text-lg text-white'>{weatherResult.current.humidity} <span className='text-[#1A7F7F]'>%</span></p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-12' src={PressureIcon} />
                        <div className='flex flex-col gap-1'>
                            <p className='text-xs text-white'>Pressure</p>
                            <p className='text-lg text-white'>{weatherResult.current.pressure_mb} <span className='text-[#1A7F7F]'>mb</span></p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-12' src={PrecipIcon} />
                        <div className='flex flex-col gap-1'>
                            <p className='text-xs text-white'>Precipitation</p>
                            <p className='text-lg text-white'>   {Math.round(weatherResult.current.precip_in * 2.54 * 10) / 10} <span className='text-[#1A7F7F]'>cm</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
