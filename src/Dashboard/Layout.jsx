/* eslint-disable react-hooks/set-state-in-effect */
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import Navbar from "./Components/Navbar"
import ErrorPage from "../Error Page/Page"
import Sidebar from "./Components/Sidebar"

import Dashboard from "./Home/Page"
import LeaveLayout from "./Leave/Layout"
import UserLayout from "./Users/Layout"
import SettingsLayout from "./Settings/Layout"

const DashboardLayout = () => 
{
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [user, setUser] = useState("Samuel Muigai")
    const [userGender, setUserGender] = useState("Male")
    const [country, setCountry] = useState("KE")
    const [notifications, setNotifications] = useState(42)
    const [messages, setMessages] = useState(10)

    const location = useLocation()
    useEffect(() => 
    {
        setSidebarOpen(false)
    }, [location.pathname])

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />

            {/* Main content area */}
            <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"} ml-0`}>
                {/* Navbar */}
                <div className="fixed top-0 left-0 right-0 z-30">
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} notifications={notifications} messages={messages}/>
                </div>

                {/* Scrollable main content */}
                <main className="flex-1 mt-16 overflow-auto bg-gray-50 px-1 pt-4">
                    <Routes>
                        <Route path="/" element={<Dashboard user={user}/>} />
                        <Route path="/leave/*" element={<LeaveLayout user={user} userGender={userGender} country={country} />} />
                        <Route path="/users/*" element={<UserLayout user={user} userGender={userGender} country={country} />} />
                        <Route path="/settings/*" element={<SettingsLayout user={user} userGender={userGender} country={country} />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}
 
export default DashboardLayout