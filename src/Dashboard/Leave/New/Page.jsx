import { useState } from "react"
import { Link } from "react-router-dom"

import LeaveDetails from "./Steps/LeaveDetails"
import HandOver from "./Steps/HandOver"
import ConfirmDates from "./Steps/ConfirmDates"
import Summary from "./Steps/Summary"

const LeaveForm = ({ userGender, country }) => 
{
    const [step, setStep] = useState(1)

    const employees = [
        { id: "EMP001", name: "Winnie Wachira" },
        { id: "EMP002", name: "Ndungu Muigai" },
        { id: "EMP003", name: "Susan Kamau" },
        { id: "EMP004", name: "Tony Mwangi" },
        { id: "EMP005", name: "Alice Njeri" },
        { id: "EMP006", name: "John Otieno" },
    ]

    const [leaveApplicationData, setLeaveApplicationData] = useState(
    {
        leaveType: "",
        startDate: "",
        endDate: "",
        fileAttachment: null,
        reason: "",
        totalDays: "",
        leaveDates: {},
        handover: {
            employee:
            {
                name: "",
                id: ""
            },
            tasks: []
        } 
    })

    //Stylings
    const select = "select select-bordered select-neutral w-full bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
    const inputStyling = "input input-neutral input-bordered w-full bg-inherit focus:outline-none focus:ring-2 focus:ring-sky-400"
    const filtersContainerStyling = "flex flex-col gap-1"
    const labelStyling = "text-sm font-medium text-gray-700"

    const requiredInputLabel = () => <sup className="text-red-600 text-base">*</sup>

    const submitApplication = () =>
    {
        console.log(leaveApplicationData)
    }
        
    return ( 
        <>
             <div className="flex justify-between items-center mb-1 px-1">
                <h2 className="text-2xl font-bold text-gray-800">Leave Application</h2>
                <Link to={"/dashboard/leave/my-leave"} className="btn btn-success text-white">Cancel</Link>
            </div>
            <ul className="steps steps-horizontal w-full mb-1">
                <li className={`step ${step >= 1 ? "step-info" : ""}`}>Leave Details</li>
                <li className={`step ${step >= 2 ? "step-info" : ""}`}>Hand over</li>
                <li className={`step ${step >= 3 ? "step-info" : ""}`}>Confirm Leave Duration</li>
                <li className={`step ${step >= 4 ? "step-info" : ""}`}>Review & Submit</li>
            </ul>

            <div className="lg:px-2">
                <div className="p-3 space-y-3 bg-white rounded-lg shadow-md">
                    {
                        step === 1 && <LeaveDetails userGender={userGender} filtersContainerStyling={filtersContainerStyling} select={select} inputStyling={inputStyling} labelStyling={labelStyling} setStep={setStep} leaveApplicationData={leaveApplicationData} setLeaveApplicationData={setLeaveApplicationData} requiredInputLabel={requiredInputLabel} country={country}/>
                    }
                    {
                        step === 2 && <HandOver leaveApplicationData={leaveApplicationData} filtersContainerStyling={filtersContainerStyling} select={select} inputStyling={inputStyling} labelStyling={labelStyling} employees={employees} setLeaveApplicationData={setLeaveApplicationData} setStep={setStep} requiredInputLabel={requiredInputLabel}/>
                    }
                    {
                        step === 3 &&  <ConfirmDates leaveApplicationData={leaveApplicationData} setLeaveApplicationData={setLeaveApplicationData} setStep={setStep} select={select}/>
                    }
                    {
                        step === 4 && <Summary leaveApplicationData={leaveApplicationData} setStep={setStep} submitApplication={submitApplication} />
                    }
                </div>
            </div>
        </>
    )
}
 
export default LeaveForm