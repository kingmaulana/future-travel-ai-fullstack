

import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function UserTripCard({ trip, onDelete, navigate }) {
    //   console.log("🚀 ~ UserTripCard ~ trip:", trip)
    const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
        trip && GetPlacePhoto()
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0]?.photos[3]?.name)
            // console.log("🚀 ~ result ~ PhotoUrl:", PhotoUrl)
            setPhotoUrl(PhotoUrl)
        })
    }
    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this trip?')) {
            onDelete(trip.id);
        }
    }

    return (
        <div 
            onClick={() => navigate('/view-trip/' + trip.id)}
            className='hover:scale-105 transition-all relative cursor-pointer group'>
            <button
                onClick={handleDelete}
                className='absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600'
                title="Delete trip">
                <TrashIcon className="h-5 w-5 text-white" />
            </button>
                <img src={photoUrl ? photoUrl : "/placeholder.png"} className="object-cover rounded-xl h-[250px]" />

                <div>
                    <h2 className='font-bold text-lg text-black'>{trip.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
        </div>
    )
}
