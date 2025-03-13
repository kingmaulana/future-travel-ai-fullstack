

import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

export default function Hotels({ trip }) {
  return (
    <div>
        <h2 className='font-bold mt-5 text-xl'>Hotel Recomendation</h2>
        {/* <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+" "+hotel?.hotelAddress} target='_blank'> */}
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
               <HotelCardItem hotel={hotel} />
            ))}
        </div>
    </div>
  )
}
