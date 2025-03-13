import { StrictMode } from 'react'
import { store } from './store/store.js'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Login from './components/custom/Login.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import { Provider } from 'react-redux'

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/create-trip',
                element: <CreateTrip />
            },
            {
                path: '/view-trip/:tripId',
                element: <ViewTrip />
            },
            {
                path: 'my-trips',
                element: <MyTrips />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
                <Toaster />
                <RouterProvider router={router} />
            </GoogleOAuthProvider>
        </Provider>
    </StrictMode>
)
