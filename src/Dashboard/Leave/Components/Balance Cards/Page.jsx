import { FaRegCalendarCheck } from "react-icons/fa"
import { MdMedicalServices, MdFamilyRestroom, MdPregnantWoman } from "react-icons/md"

const LeaveBalanceCards = ({ userGender }) => 
{
    const iconSize = 24
    const leaveTypes = [
        { 
            type: "Normal", 
            icon: <FaRegCalendarCheck size={iconSize} />, 
            balance: 21, 
            color: "bg-blue-100 text-blue-600", border: "border-blue-300" 
        },
        { 
            type: "Sick", 
            icon: <MdMedicalServices size={iconSize} />, 
            balance: 10, 
            color: "bg-red-100 text-red-600", 
            border: "border-red-300"
        },
        { 
            type: "Paternity", 
            icon: <MdFamilyRestroom size={iconSize} />, 
            balance: 14, 
            color: "bg-green-100 text-green-600", 
            border: "border-green-300" 
        },
        { 
            type: "Maternity", 
            icon: <MdPregnantWoman size={iconSize} />, 
            balance: 90, 
            color: "bg-pink-100 text-pink-600", 
            border: "border-pink-300" 
        },
    ]

    // Gender filtering
    const filteredLeaveTypes = leaveTypes.filter(leave => {
        if (userGender === "Male" && leave.type === "Maternity") return false
        if (userGender === "Female" && leave.type === "Paternity") return false
        return true
    })

    return ( 
        <div className="flex flex-col md:flex-row gap-4 w-full">
            {
                filteredLeaveTypes.map(leave=> 
                {
                    return(
                        <div key={leave.type} className={`flex-1 p-2 bg-white shadow-md rounded-xl border ${leave.border} cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] transition-all`}>
                            <div className="flex items-center gap-4">
                                <p className={`p-4 rounded-md ${leave.color}`}>{leave.icon}</p>
                                <div>
                                    <p className="font-bold text-gray-700">{leave.type} Leave</p>
                                    <p className="text-sm text-gray-500">
                                        Balance: <span className="font-semibold">{leave.balance} days</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
 
export default LeaveBalanceCards