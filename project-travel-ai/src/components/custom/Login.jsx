import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../slices/loginSlice"
import { useNavigate } from "react-router"

export default function Login() {
const dispatch = useDispatch()
const navigate = useNavigate()
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState("")

useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
    navigate('/')
    }
}, [navigate])

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

async function handleLogin(e) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
    await dispatch(login({ email, password })).unwrap()
    navigate('/')
    } catch(err) {
    setError(err.message || "Login failed. Please try again.")
    } finally {
    setIsLoading(false)
    }
}

return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
        </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleLogin}>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
            </label>
            <div className="mt-1">
                <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            </div>

            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
            </label>
            <div className="mt-1">
                <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            </div>

            {error && (
            <div className="text-red-600 text-sm">
                {error}
            </div>
            )}

            <div>
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
                {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ) : null}
                {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            </div>
        </form>
        </div>
    </div>
    </div>
)
}
