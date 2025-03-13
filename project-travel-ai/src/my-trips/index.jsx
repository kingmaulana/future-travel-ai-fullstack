

import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCard from './components/UserTripCard'

export default function MyTrips() {
    const navigate = useNavigate()
    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        GetUserTrips()
    }, [])

    const deleteTrip = async (tripId) => {
        try {
            await deleteDoc(doc(db, 'AITrips', tripId));
            setUserTrips(userTrips.filter(trip => trip.id !== tripId));
            toast.success('Trip deleted successfully');
        } catch (error) {
            console.error('Error deleting trip:', error);
            toast.error('Failed to delete trip');
        }
    }

    //Use get all user trips
    const GetUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            navigate('/')
            return
        }

        
        //This is how we get data from firestore
        const q = query(collection(db, 'AITrips'),where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setUserTrips((prevVal) => [...prevVal, doc.data()])
        });
        console.log(userTrips);
    }
    
    return (
        <div className='sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCard trip={trip} key={trip.id} onDelete={deleteTrip} navigate={navigate}/>
                ))
            :[1,2,3,4,5,6].map((item, index) => (
                <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>

                </div>
            ))
            }
            </div>
        </div>
    )
}
