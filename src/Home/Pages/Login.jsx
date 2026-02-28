import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import Logo from "../../assets/Logo.png"

import IntroText from "../Components/IntroText"

const Login = () => 
{
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState(() => 
    {
        // Check if there are saved credentials in localStorage
        const savedUsername = localStorage.getItem("username")
        const savedPassword = localStorage.getItem("password")

        // If credentials exist, return them; otherwise, return empty strings
        return {
            username: savedUsername || "",
            password: savedPassword || "",
        }
    })
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(() => 
    {
        // Check if there are saved credentials in localStorage to determine the initial state of rememberMe
        const savedUsername = localStorage.getItem("username")
        const savedPassword = localStorage.getItem("password")

        // If both username and password are saved, set rememberMe to true; otherwise, false
        return !!(savedUsername && savedPassword)
    })

    const iconSize  = 18

    const handleInputChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value })
    const handleRememberMeChange= () => setRememberMe(prev => !prev)
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    const login = e => 
    {
        e.preventDefault()
        console.log(credentials)
        if(rememberMe)
        {
            localStorage.setItem("username", credentials.username)
            localStorage.setItem("password", credentials.password)
        }
        else
        {
            localStorage.removeItem("username")
            localStorage.removeItem("password")
        }
        toast.success("Login successful", 
        {
            onClose: () => 
            {
                navigate("/dashboard")
                setCredentials({ username: "", password: "" })
            }
        })
    }

    return ( 
        <div className="min-h-screen flex flex-col md:flex-row">
            <IntroText />
            
            <div className="grid-2">
                <form className="form-styling" onSubmit={login}>
                    <div className="text-center">
                        <img src={Logo} alt="Company Logo" className="mx-auto mb-2" />
                        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-sm text-gray-600">Please sign in to your account</p>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Username</label>
                        <div className="relative">
                            <svg className="absolute left-3 top-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20 ">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input type="text" name="username" id="username" value={credentials.username} onChange={handleInputChange} placeholder="Enter your username" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <div className="relative">
                            <svg className="absolute left-3 top-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20 ">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" value={credentials.password} onChange={handleInputChange} placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"/>
                            <div className="absolute right-3 top-4 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                                {
                                    showPassword 
                                    ? 
                                        <FaEyeSlash size={iconSize}/> 
                                    : 
                                        <FaEye size={iconSize}/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="label">
                            <input type="checkbox" defaultChecked className="checkbox checkbox-accent checkbox-sm" checked={rememberMe} onChange={handleRememberMeChange}/>
                            Remember me
                        </label>
                        <Link to={"/password-reset"} className="link link-primary">Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn btn-success w-full text-white">Login</button>
                </form>
            </div>
        </div>
    )
}
 
export default Login