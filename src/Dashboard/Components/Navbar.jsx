import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMessage, MdOutlineSettings } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen, user, notifications, messages }) => 
{
    const iconSize = 24

    return (
        <nav className="navbar bg-gray-900 shadow-sm px-4 py-2 text-white">
            <div className="navbar-start flex-1 px-3.5">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                {
                    sidebarOpen 
                    ? 
                    
                        <RxCross1 size={iconSize} />
                    : 
                        <IoMenu size={iconSize} />
                    
                }
                </button>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
                {/* Notification Icon */}
                <div className="indicator">
                    <span className="indicator-item badge badge-error badge-sm text-white">
                        {notifications > 9 ? "9+" : notifications}
                    </span>
                    <button className="btn btn-ghost btn-circle">
                        <IoNotificationsOutline size={20} />
                    </button>
                </div>

                {/* Message Icon */}
                <div className="indicator">
                    <span className="indicator-item badge badge-error badge-sm text-white">
                        {messages > 9 ? "9+" : messages}
                    </span>
                    <button className="btn btn-ghost btn-circle">
                        <MdOutlineMessage size={20} />
                    </button>
                </div>

                {/* Settings Icon */}
                <NavLink to={"/dashboard/settings"} className={({ isActive }) => `btn btn-ghost btn-circle transition-all duration-200 hover:bg-gray-700 ${isActive ? "bg-gray-700"  : ""}`} title="Settings">
                    <MdOutlineSettings size={20} />
                </NavLink>

                {/* Profile Section */}
                <Link to="/dashboard/profile" className="flex flex-col items-center hover:opacity-80 transition-opacity" title="Profile">
                    <div className="avatar">
                        <div className="w-10 rounded-full ring ring-gray-700 ring-offset-1 ring-offset-gray-900">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User"/>
                        </div>
                    </div>
                    <div className="mt-1 text-center">
                        <p className="text-[11px]">{user || " "}</p>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar