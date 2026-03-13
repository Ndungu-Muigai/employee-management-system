import { TiPencil } from "react-icons/ti"

import StepEditIcon from "../../../Components/StepEditIcon"

const Summary = ({ leaveApplicationData, setStep, submitApplication }) => 
{
    const { leaveType, startDate, endDate, totalDays, reason, fileAttachment, leaveDates, handover } = leaveApplicationData

    const getGridColsClass = length => 
    {
        if (length <= 2) return "grid-cols-1 sm:grid-cols-2"
        if (length <= 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
        if (length <= 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        if (length <= 9) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    }

    //Styling for the edit icon
    const iconStyling = "hover:text-gray-300"
    const iconSize = 22

    return (
        <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-2">Review Your Leave Application</h2>

            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                {/* Left – Summary + Handover */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl shadow p-3 space-y-2">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-lg font-semibold text-gray-700 ">Leave Summary</h3>
                            <StepEditIcon setStep={setStep} step={1}/>
                        </div>
                        <p><span className="font-medium">Leave Type:</span> {leaveType}</p>
                        <p><span className="font-medium">Start Date:</span> {startDate}</p>
                        <p><span className="font-medium">End Date:</span> {endDate}</p>
                        <p><span className="font-medium">Total Days:</span> {totalDays}</p>
                        <p><span className="font-medium">Reason:</span> {reason || <em className="text-gray-400">N/A</em>}</p>
                        <p>
                            <span className="font-medium">File Attachment:</span>{" "}
                            {fileAttachment ? (
                                <span className="badge badge-success text-white ml-2">{fileAttachment.name}</span>
                            ) : (
                                <span className="text-red-500 ml-2">No file attached</span>
                            )}
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow p-3 space-y-2">
                        <div className="flex justify-between items-center border-b pb-1">
                            <h3 className="text-lg font-semibold text-gray-700">Handover Details</h3>
                            <StepEditIcon setStep={setStep} step={2}/>
                        </div>
                        <p><span className="font-medium">Employee Name:</span> {handover.employee.name || <em className="text-gray-400">N/A</em>}</p>
                        <p className="font-medium">Tasks:</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                            {
                                handover.tasks && handover.tasks.length > 0
                                ? 
                                    handover.tasks.map((task, idx) => 
                                        <li key={idx} className="ml-3">{task || <em className="text-gray-400">N/A</em>}</li>
                                    )
                                : 
                                    <li><em className="text-gray-400">No tasks assigned</em></li>
                                }
                        </ul>
                    </div>
                </div>

                {/* Right – Leave Days Breakdown */}
                <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow p-3 overflow-auto">
                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-700">Leave Days Breakdown</h3>
                            <StepEditIcon setStep={setStep} step={3}/>
                    </div>
                    <div className={`grid gap-2 ${getGridColsClass(Object.keys(leaveDates).length)}`}>
                        {Object.entries(leaveDates).map(([date, type]) => (
                            <div key={date} className="p-2 border rounded-md flex flex-col shadow-sm">
                                <span className="text-sm font-medium text-gray-800">{date}</span>
                                <span className={`text-xs mt-1 px-2 py-1 rounded-md w-fit ${type === "Full" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                                    {type} Day
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-2">
                <button type="button" className="btn btn-outline hover:text-white text-black" onClick={() => setStep(3)}>Previous</button>
                <button type="button" className="btn btn-success text-white" onClick={submitApplication}>Submit Application</button>
            </div>
        </div>
    )
}

export default Summary