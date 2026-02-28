/* eslint-disable react-hooks/exhaustive-deps */
import { FaHome, FaCalendarCheck, FaRegCalendarAlt, FaUserClock, FaUsers, FaBoxes, FaBox, FaBoxOpen, FaTools } from "react-icons/fa"
import { FaCalendarDays } from "react-icons/fa6"
import { FcOvertime } from "react-icons/fc"
import { FiLogOut } from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"
import { LuCalendarClock, LuAlarmClockCheck } from "react-icons/lu"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { RiCalendarScheduleLine } from "react-icons/ri"

import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

import Logo from "../../assets/Logo.png"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => 
{
    const [openMenu, setOpenMenu] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const sidebarRef = useRef(null)

    // This function ensures a parent stays active for any nested path
    const isParentActive = parentPath => 
    {
        if (!parentPath) return false
        return location.pathname.startsWith(parentPath)
    }

    const handleParentClick = title => 
    {
        if (!sidebarOpen) setSidebarOpen(true)
        setOpenMenu(openMenu === title ? null : title)
    }

    useEffect(() => 
    {
        if (!sidebarOpen) setOpenMenu(null)
    }, [sidebarOpen])

    const links = [
        {
            title: "Dashboard",
            icon: <FaHome size={18} />,
            link: "/dashboard",
            isExactDashboard: location.pathname === "/dashboard"
        },
        {
            title: "Leave",
            icon: <FaRegCalendarAlt size={18} />,
            parentPath: "/dashboard/leave",
            children: [
                {
                    title: "My Leave",
                    icon: <FaCalendarDays size={15} />,
                    link: "/dashboard/leave/my-leave",
                },
                {
                    title: "Pending Requests",
                    icon: <RiCalendarScheduleLine size={15} />,
                    link: "/dashboard/leave/pending-requests",
                },
                {
                    title: "Approved Requests",
                    icon: <FaCalendarCheck size={15} />,
                    link: "/dashboard/leave/approved-requests",
                },
            ],
        },
        {
            title: "Assets",
            icon: <FaBoxes size={18} />,
            parentPath: "/dashboard/assets",
            children: [
                {
                    title: "My Assets",
                    icon: <FaBoxOpen size={15} />,
                    link: "/dashboard/assets/my-assets",
                },
                {
                    title: "Manage assets",
                    icon: <FaTools size={15} />,
                    link: "/dashboard/assets/manage-assets",
                },
            ],
        },
        // {
        //     title: "Attendance",
        //     icon: <LuCalendarClock size={18} />,
        //     parentPath: "/dashboard/attendance",
        //     children: [
        //         {
        //             title: "My Attendance",
        //             icon: <FaUserClock size={15} />,
        //             link: "/dashboard/attendance/my-attendance",
        //         },
        //         {
        //             title: "Employee Attendance",
        //             icon: <HiOutlineUserGroup size={15} />,
        //             link: "/dashboard/attendance/employees-attendance",
        //         },
        //     ],
        // },
        // {
        //     title: "Overtime",
        //     icon: <FcOvertime size={18} />,
        //     parentPath: "/dashboard/overtime",
        //     children: [
        //         {
        //             title: "My Overtime",
        //             icon: <FaUserClock size={15} />,
        //             link: "/dashboard/overtime/my-overtime",
        //         },
        //         {
        //             title: "Approved OT Requests",
        //             icon: <LuAlarmClockCheck size={15} />,
        //             link: "/dashboard/overtime/approved-overtime",
        //         },
        //     ],
        // },
        {
            title: "Users",
            icon: <FaUsers size={18} />,
            link: "/dashboard/users",
            parentPath: "/dashboard/users"
        },
    ]

    useEffect(() => 
    {
        const handleClickOutside = event => 
        {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) 
            {
                setSidebarOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [sidebarRef])

    const logout = () => 
    {
        Swal.fire(
        {
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
        })
        .then((result) => 
        {
            if (result.isConfirmed)
            {
                navigate("/")
                toast.success("Logged out successfully!")
            }
        })
    }

    return (
        <aside className="sidebar" ref={sidebarRef}>
            <div className={`fixed top-19 left-0 h-[calc(100vh-64px)] bg-gray-900 text-white z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64" } lg:translate-x-0 ${sidebarOpen ? "lg:w-64" : "lg:w-20"} flex flex-col`}>
                <div className={`flex items-center ${sidebarOpen ? "justify-center lg:justify-start" : "justify-center"}`}>
                    {
                        sidebarOpen && <img src={Logo} alt="Mobikey Truck & Bus Limited" className="bg-white w-full" />
                    }
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ul className="mt-1 space-y-1.5">
                        {
                        links.map((link) => 
                            (
                            <li key={link.title}>
                                {
                                    link.children 
                                    ? 
                                        <>
                                            <button onClick={() => handleParentClick(link.title)} className={`flex items-center w-full gap-3 p-4 rounded-lg transition-all duration-200 ${isParentActive(link.parentPath) ? "bg-gray-700 font-semibold shadow-inner" : "hover:bg-gray-700"} ${sidebarOpen ? "justify-start" : "justify-center"}`} title={link.title}>
                                                {link.icon}
                                                {sidebarOpen && (
                                                    <>
                                                        <span className="flex-1 text-left">{link.title}</span>
                                                        {
                                                            openMenu === link.title 
                                                            ? 
                                                                <MdKeyboardArrowUp size={20} />
                                                            : 
                                                                <MdKeyboardArrowDown size={20} />
                                                        }
                                                    </>
                                                )}
                                            </button>

                                            {
                                            openMenu === link.title && sidebarOpen && 
                                            (
                                                <ul className="ml-2 space-y-1">
                                                    {
                                                        link.children.map((child) => (
                                                            <li key={child.title}>
                                                                <NavLink to={child.link} end className={({ isActive }) =>  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ml-6 ${isActive ? "bg-gray-700 font-semibold shadow-inner" : "hover:bg-gray-700" } ${sidebarOpen ? "justify-start" : "justify-center"}`} title={child.title}>
                                                                    {child.icon}
                                                                    {sidebarOpen && <span>{child.title}</span>}
                                                                </NavLink>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            )}
                                        </>
                                    : 
                                        <NavLink to={link.link} end className={() => `flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${link.isExactDashboard ? "bg-gray-700 font-semibold shadow-inner" : isParentActive(link.parentPath) ? "bg-gray-700 font-semibold shadow-inner" : "hover:bg-gray-700" } ${sidebarOpen ? "justify-start" : "justify-center"}`} title={link.title}>
                                            {link.icon}
                                            {sidebarOpen && <span>{link.title}</span>}
                                        </NavLink>
                                }
                            </li>
                        ))}
                    </ul>

                    <li className="mt-4 py-2 border-t border-gray-700 w-full">
                        <button onClick={logout} className={`flex items-center gap-3 p-4 rounded-lg w-full transition-all duration-200 hover:bg-gray-700 ${sidebarOpen ? "justify-start ml-0" : "justify-center"}`} title="Logout">
                            <FiLogOut size={18} />
                            {sidebarOpen && <span className="flex-1 text-left">Logout</span>}
                        </button>
                    </li>
                </div>
            </div>

            {
                sidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                )
            }
        </aside>
    )
}

export default Sidebar