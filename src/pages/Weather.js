import React, { useState,useEffect } from 'react'
import Image from 'next/image'

const Weather = ({data,city}) => {
    const [sunrise, setsunrise] = useState("")
    const [sunset, setsunset] = useState("")
    useEffect(() => {
        const calculate=(value)=>{
            const sunriseTimestamp = value * 1000; // Convert to milliseconds

const sunriseDate = new Date(sunriseTimestamp);
const Time = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
return Time
        }
     setsunrise(calculate(data.sunrise))
     setsunset(calculate(data.sunset))
    }, [])
    
   
  return (
    <div className=' relative flex flex-col justify-between max-w-[500px] w-full  m-auto p-4 text-gray-50 '>
{/* Top */}
<div className=' relative flex justify-between pt-12'>
    <div className='flex flex-col items-center'>
  <Image src='/weather-forecast.png' width={100} height={100} alt='weather' />
    </div>
    <p className=' text-8xl'>{data.temp}&#176;C</p>
</div>


{/* Bottom */}
<div className=' bg-black/50 relative p-8 rounded-md mt-20 text-white'>
    <p className=' text-2xl text-center pb-6 capitalize'>Weather in {city}</p>
    <div className=' flex flex-wrap justify-between text-center'>
        <div className='m-1' > 
            <p className=' font-bold text-2xl '> {data.feels_like}&#176;C</p>
            <p  className=' text-xl'>Feels Like</p>
        </div>
        <div className='m-1'>
            <p className=' font-bold text-2xl'>{data.humidity}%</p>
            <p className=' text-xl'>Humdity</p>
        </div>
        <div className='m-1'>
            <p className=' font-bold text-2xl'> {data.wind_speed} MPH</p>
            <p className=' text-xl'>Wind</p>
        </div>
        <div className='m-1'>
            <p className=' font-bold text-2xl'>{data.min_temp}&#176;C </p>
            <p  className=' text-xl'>Min Temp</p>
        </div>
        <div className='m-1'>
            <p className=' font-bold text-2xl'>{data.max_temp}&#176;C </p>
            <p  className=' text-xl'>Max Temp</p>
        </div>
        <div className='m-1'>
            <p className=' font-bold text-2xl'>{sunrise} </p>
            <p  className=' text-xl'>Sunrise</p>
        </div>
        <div className='m-1'>
            <p className=' font-bold text-2xl'>{sunset}</p>
            <p  className=' text-xl'>Sunset</p>
        </div>
    </div>
</div>
    </div>
  )
}

export default Weather