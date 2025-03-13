
import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function PlaceCardItem({ place }) {

    const [photoUrl, setPhotoUrl] = useState('')
    
      useEffect(() => {
        place&&GetPlacePhoto()
      }, [place])
    
      const GetPlacePhoto= async ()=> {
        const data = {
          textQuery: place.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
          setPhotoUrl(PhotoUrl)
        })
      }


    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
            <div className='border border-xl p-3 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md h-[200px] md:h-max rounded-lg'>
                <img src={photoUrl ? photoUrl : '/placeholder.png'} alt="" className='w-[150px] h-[150px] rounded-xl object-cover' />
                <div >
                    <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>

                    <p className='text-sm text-gray-400 overflow-hidden text-clip'>{place.placeDetails}</p>
                    <h2 className='mt-2 font-medium mb-2 text-slate-600'>🕑 {place.timeToTravel} minutes</h2>
                    <Button size="sm"><FaMapLocationDot /> Navigate </Button>
                </div>
            </div>
        </Link>
    )
}
