

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectedBudgetOptions, selectTravelesList } from '@/constants/options'
// import { chatSession } from '@/service/AIModal'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'


function CreateTrip() {
  const [place, setPlace] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user')

    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData.traveler) {
      toast("PLease fill all the details!")
      return;
    }

    setLoading(true)
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    console.log("🚀 ~ onGenerateTrip ~ FINAL_PROMPT:", FINAL_PROMPT)

    // const result = await chatSession.sendMessage(FINAL_PROMPT)
    // console.log("🚀 ~ onGenerateTrip ~ result:", result?.response?.text())
    // setLoading(false)
    // SaveAiTrip(result?.response?.text())

    const result = await axios.post('https://ai.maulanadev.my.id/trip/create-trip', {
      userPrompt: FINAL_PROMPT
    })

    if (result.data && result.data.data && result.data.data.response) {
      SaveAiTrip(result.data.data.response.text);
    } else {
      throw new Error('Invalid response format from server');
    }

  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false)
      onGenerateTrip()
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10 mx-24">
      <h2 className="font-bold text-3xl">Share your travel preferences with us ✈️🌍</h2>
      <p className="mt-3 text-gray-500 text-xl">Share your travel details, and we’ll create a personalized itinerary just for you!</p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-bold">What is destionation of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v)
                handleInputChange('location', v)
              }
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-bold">How many days are you want to trip?</h2>
          <Input
            placeholder={`Ex.3`} type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-bold">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectedBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-bold">Who do you plan on your next adventure?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectTravelesList.map((item, index) => (
              <div key={index}
                onClick={(e) => handleInputChange('traveler', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.title && 'shadow-lg border-black'}`}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
            "Generate Trip"
          }
        </Button>
      </div>

      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>

            <DialogTitle></DialogTitle>

            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                className="w-full mt-5 gap-4 items-center"
                onClick={login}>

                <FcGoogle className="h-7 w-7" />
                Sign In With Google

              </Button>
            </DialogDescription>

          </DialogHeader>
        </DialogContent>

      </Dialog>

      {/* <Dialog open={openDialog}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog> */}
    </div>
  )
}

export default CreateTrip
