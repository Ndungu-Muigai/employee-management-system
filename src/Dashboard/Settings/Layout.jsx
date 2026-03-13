import { NavLink, Routes, Route } from "react-router-dom"

import Home from "./Home/Page"
import CountriesLayout from "./Countries/Layout"
import BranchesLayout from "./Branches/Layout"
import DepartmentsLayout from "./Departments/Layout"
import RolesLayout from "./Roles/Layout"
import ErrorPage from "../../Error Page/Page"

const SettingsLayout = () => 
{
    const links = [
        { url: "/dashboard/settings", title: "Home" },
        { url: "/dashboard/settings/countries", title: "Countries" },
        { url: "/dashboard/settings/branches", title: "Branches" },
        { url: "/dashboard/settings/departments", title: "Departments" },
        { url: "/dashboard/settings/roles", title: "Roles" }
    ]

    return (
        <div>
            {/* Tabs */}
            <div className="sticky top-0 bg-white border-b border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-8 justify-center border-b border-gray-200 p-2">
                    {
                        links.map(link => 
                        {
                            const isHome = link.url === "/dashboard/settings"
                            return (
                                <NavLink key={link.title} to={link.url} end={isHome} className={({ isActive }) => `px-3 py-2 text-sm font-medium text-center transition rounded ${isActive ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}>{link.title}</NavLink>
                            )
                        })
                    }
                </div>
            </div>

            {/* Content */}
            <div className="p-2">
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/countries/*" element={<CountriesLayout/>}></Route>
                    <Route path="/branches/*" element={<BranchesLayout/>}></Route>
                    <Route path="/departments/*" element={<DepartmentsLayout/>}></Route>
                    <Route path="/roles/*" element={<RolesLayout/>}></Route>
                    <Route path="*" element={<ErrorPage/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default SettingsLayout
