
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="relative min-h-screen bg-[url('/black.png')] bg-cover bg-center bg-no-repeat">
    <div className="relative flex flex-col items-center px-4 md:px-0">
        <div className='flex flex-col items-center gap-8 max-w-4xl mx-auto pt-24'>
        <h1 className="font-bold text-[50px] text-center text-black bg-white shadow-xl">
            <span className="text-white bg-black py-1 px-3 shadow-lg">Embark on Your Dream Trip:</span> Effortless, Personalized Itineraries!</h1>
        <p className="text-xl text-slate-600 text-center">"Skip the hassle of travel planning and enjoy seamless adventures! Whether you seek hidden gems, cultural wonders, or scenic escapes, crafting your perfect itinerary is easier than ever. Plan a trip that suits your style, pace, and passions—making every journey uniquely yours!"</p>

        <Link to={'/create-trip'}>
            <Button className="bg-slate-900 hover:bg-slate-700 text-white shadow-md">Get Started, it's Free</Button>
        </Link>
        </div>
    </div>
    </div>
  )
}

export default Hero