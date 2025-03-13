

import React from 'react'
import PlaceCardItem from './PlaceCardItem'

export default function PlacesToVisit({ trip }) {
  console.log("🚀 ~ PlacesToVisit ~ trip:", trip)
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-lg'>Places to Visit</h2>

        <div>
            {trip.tripData?.travelPlan?.itinerary.map((item, index) => (
                <div key={index} className='mt-3'>
                    <div>
                    <h2 className='font-bold text-lg'>{item.day}</h2>

                    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-5'>
                    {item.activities.map((place, index) => (
                        <div key={index} className='my-3'>
                            <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                            <PlaceCardItem place={place}/>
                            </div>
                    ))}
                    </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
