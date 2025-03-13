
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import Swal from 'sweetalert2'
import Login from './Login';


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    console.log(user?.picture);

    // google.accounts.id.initialize({
    //   client_id: "1037520011360-dbeq797tjfr1c0ffqj659v2q8vv4nbp2.apps.googleusercontent.com",
    //   callback: handleCredentialResponse
    // });

    // // Button login
    // google.accounts.id.renderButton(
    //   document.getElementById("buttonDiv"),
    //   { theme: "outline", size: "large" }  // customization attributes
    // );
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
      window.location.reload()
    })
  }


  // async function handleCredentialResponse({ credential }) {
  //   console.log("Encoded JWT ID token: " + credential);

  //   try {
  //     const response = await axios.post('http://localhost:3000/user/google-login', {
  //       googleToken: credential
  //     })
  //     localStorage.setItem("access_token", response.data.access_token);
  //     Swal.fire({
  //       title: "Success!",
  //       text: "Login Berhasil",
  //       icon: 'success'
  //     })
  //     navigate("/");
  //   } catch (error) {
  //     console.log("🚀 ~ handleSubmit ~ error:", error)
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Login Gagal invalid email/password",
  //       icon: 'error'
  //     })
  //   }
  // }

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <Link to="/">
        <img src="/logo.svg" alt="" className="cursor-pointer" />
        </Link>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
              <Button variant='outline' className='rounded-full text-white bg-black font-semibold'>+ Create Trip</Button>
            </a>

            <a href="/my-trips">
              <Button variant='outline' className='rounded-full text-white bg-black font-semibold'>My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    window.location.reload()
                  }}>Logout</h2>
              </PopoverContent>
            </Popover>

          </div>
          :
          <div className='flex gap-5'>
            {/* <Login /> */}
            <Button onClick={() => setOpenDialog(true)}><span><FcGoogle className="h-7 w-7" /></span> Sign In</Button>
            {/* <Link to={'/login'} className='bg-black text-white '>Login</Link> */}
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

            {/* Place for ui google login will display, its from documentation */}
            {/* <div id="buttonDiv" className="mt-5"></div> */}
          </div>
        }
      </div>
    </div>
  )
}

export default Header