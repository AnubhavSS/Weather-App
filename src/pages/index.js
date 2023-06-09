import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })
import axios from 'axios';
import Weather from './Weather';
import spinner from '../../public/loading-gif.gif'


export default function Home() {
  const [city, setcity] = useState('')
  const [weather, setweather] = useState({})
  const [loading, setloading] = useState(false)

  const fetchWeather = async (e) => {
    e.preventDefault()
    setloading(true)
    const options = {
      method: 'GET',
      url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
      params: { city: city },
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_WEATHER_KEY,
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
    //  console.log(response.data);
      setweather(response.data)
    } catch (error) {
      console.error(error);
    }
    
    setloading(false)
  }
  return (
    <div>
      {/* Overlay */}
      <div className=' absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]' />
      {/* Background Image */}
      <Image fill className=' object-fill overflow-hidden ' alt='scenery' src='https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80' />


      {/* Search */}
      <div className=' relative flex  max-w-[500px]  m-auto pt-4 text-white z-10'>
        <form  className='flex justify-between items-centerw-64 md:w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
          <div>
            <input onChange={(e)=>setcity(e.target.value)} className='bg-transparent border-none text-white focus:outline-none text-2xl ' type='text' placeholder='Search City' />
          </div>
          <button type='submit' onClick={fetchWeather}><BsSearch size={20}/></button>
        </form>
      </div>


     {loading && <div
  className="flex mx-auto mt-20 h-8 w-8 animate-spin rounded-full border-4  border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>}
     


{/* Weather */}
{(Object.keys(weather).length > 0 ) && <Weather data={weather} city={city}/>}

    </div>
  )
}
