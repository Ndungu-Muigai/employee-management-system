/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import LeaveBalanceCards from "../../Components/Balance Cards/Page"
import DateRange from "../../Calculations/Date Ranges"
import { toast } from "react-toastify"

const LeaveDetails = ({ userGender, filtersContainerStyling, labelStyling, inputStyling, select, setStep, leaveApplicationData, setLeaveApplicationData, requiredInputLabel, country }) => 
{
    const { minDateRange, maxDateRange } = DateRange()

    const [publicHolidays, setPublicHolidays] = useState([])
    const [endMinDate, setEndMinDate] = useState(minDateRange)

    // Convert today to YYYY-MM-DD
    const todayFormatted = new Date().toISOString().split("T")[0]

    // Fetch the public holidays
    useEffect(() => 
    {
        const fetchHolidays = async () => 
        {
            try 
            {
                const res = await fetch(`https://api.api-ninjas.com/v1/holidays?country=${country}&type=public_holiday`,
                {
                    headers: 
                    {
                        "X-API-KEY": "af2/2pvvxVRkeXZMXUUOJQ==dxaeuo8xf45dS6Ym"
                    }
                })

                const data = await res.json()
                const dates = data.map(h => h.date)
                setPublicHolidays(dates)
            } 
            catch (err)
            {
                toast.error("Failed to fetch holidays:", err)
                setPublicHolidays([])
            }
        }

        if (country) fetchHolidays()
    }, [country])

    // Computing total days based on leaveDates object
    const computeTotalDays = leaveDates => 
    {
        if (!leaveDates) return 0
        return Object.values(leaveDates).reduce((total, type) => {
            if (type === "Full") return total + 1
            if (type === "Half") return total + 0.5
            return total
        }, 0)
    }

    //  Computing leave duration for eah day (Full / Half / Excluded)
    const computeLeaveDates = (startDate, endDate) => 
    {
        if (!startDate || !endDate) return {}

        const start = new Date(startDate)
        const end = new Date(endDate)
        const days = {}

        while (start <= end) 
        {
            const current = new Date(start)
            const key = current.toISOString().split("T")[0]

            const isSunday = current.getDay() === 0
            const isSaturday = current.getDay() === 6
            const isHoliday = publicHolidays.includes(key)

            if (!isSunday && !isHoliday) {
                days[key] = isSaturday ? "Half" : "Full"
            }

            start.setDate(start.getDate() + 1)
        }

        return days
    }

    // Handle input change and computation of leave duration
    const handleInputChange = e => 
    {
        setLeaveApplicationData(prev => 
        {
            const updated = { ...prev, [e.target.name]: e.target.value }

            

            // Recompute leaveDates whenever dates change
            if (e.target.name === "startDate" || e.target.name === "endDate") 
            {
                if (updated.startDate && updated.endDate) 
                {
                    const newLeaveDates = computeLeaveDates(updated.startDate, updated.endDate)

                    updated.leaveDates = newLeaveDates
                    updated.totalDays = computeTotalDays(newLeaveDates)
                }
            }

            return updated
        })
    }

    const handleFileChange = e => setLeaveApplicationData(prev => ({ ...prev, fileAttachment: e.target.files[0] }))

    // Update end date when the start date changes
    useEffect(() => 
    {
        if (leaveApplicationData.startDate) {
            setEndMinDate(leaveApplicationData.startDate)

            if (leaveApplicationData.endDate < leaveApplicationData.startDate) {
                setLeaveApplicationData(prev => ({ ...prev, endDate: "" }))
            }
        } 
        else {
            setEndMinDate(minDateRange)
        }
    }, [leaveApplicationData.startDate])

    // Input validation
    const isFormValid = () => 
    {
        const { leaveType, startDate, endDate, fileAttachment } = leaveApplicationData

        if (!leaveType || !startDate || !endDate) return false

        if ((leaveType === "Sick" || leaveType === "Paternity") && !fileAttachment) return false

        return true
    }

    const goToNextStep = () => 
    {
        const { leaveType, startDate, endDate, fileAttachment } = leaveApplicationData

        if (!leaveType || !startDate || !endDate) 
        {
            toast.error("Please fill all required fields")
            return
        }

        if ((leaveType === "Sick" || leaveType === "Paternity") && !fileAttachment) 
        {
            toast.error("File attachment is required for Sick or Paternity leave")
            return
        }

        if(startDate < todayFormatted)
        {
            toast.error("Start date cannot be earlier than today")
            return
        }

        if(endDate < todayFormatted)
        {
            toast.error("End date cannot be earlier than today")
            return
        }

        setStep(2)
    }

    return (
        <>
            {/* Leave Balance */}
            <LeaveBalanceCards userGender={userGender}/>

            {/* Leave Type & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Leave Type */}
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Leave Type{requiredInputLabel()}</label>

                    <select className={select} name="leaveType" value={leaveApplicationData.leaveType} onChange={handleInputChange}>
                        <option value="">Select Leave Type</option>
                        <option value="Normal">Normal</option>
                        <option value="Sick">Sick</option>
                        {
                            userGender === "Male" 
                            ? 
                                <option value="Paternity">Paternity</option> 
                            :
                                <option value="Maternity">Maternity</option>
                        }
                    </select>
                </div>

                {/* Start Date */}
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Start Date{requiredInputLabel()}</label>

                    <input type="date" min={minDateRange} max={maxDateRange} className={inputStyling} name="startDate" value={leaveApplicationData.startDate} onChange={handleInputChange}/>
                </div>

                {/* End Date */}
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>End Date{requiredInputLabel()}</label>

                    <input type="date" min={endMinDate} max={maxDateRange} className={inputStyling} name="endDate" value={leaveApplicationData.endDate} onChange={handleInputChange}/>
                </div>
            </div>


            {/* File & Reason */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* File Attachment */}
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}> File Attachment{" "}  {["Sick", "Paternity"].includes(leaveApplicationData.leaveType) && requiredInputLabel()}</label>

                    <input type="file" accept="image/*,application/pdf" className="file-input file-input-bordered file-input-neutral w-full bg-inherit" onChange={handleFileChange}/>
                </div>

                {/* Reason */}
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Reason</label>
                    <textarea className="textarea textarea-neutral w-full bg-inherit" placeholder="Provide a reason for leave (Optional)" rows={1} value={leaveApplicationData.reason} name="reason" onChange={handleInputChange}></textarea>
                </div>
            </div>


            {/* Next Button */}
            <div className="flex justify-center mt-2">
                <button type="button" className={`btn btn-success text-white w-full md:w-auto ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`} onClick={goToNextStep}>Next </button>
            </div>
        </>
    )
}

export default LeaveDetails