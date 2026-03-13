import { useState } from "react"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

import Table from "../../../Components/Table"
import LeaveBalanceCards from "../../Components/Balance Cards/Page"

const MyLeave = ({ userGender }) => 
{
    // Leave history data
    const leaveHistory = [
        {
            id: 1,
            type: "Normal",
            applied: "2025-11-01",
            start: "2025-11-10",
            end: "2025-11-12",
            days: 3,
            status: "Approved"
        },
        {
            id: 2,
            type: "Sick",
            applied: "2025-11-05",
            start: "2025-11-06",
            end: "2025-11-07",
            days: 2,
            status: "Pending"
        },
        {
            id: 3,
            type: "Paternity",
            applied: "2025-10-20",
            start: "2025-11-15",
            end: "2025-11-20",
            days: 6,
            status: "Rejected"
        }
    ]

    const navigate = useNavigate()

    // FILTER STATES
    const [filterType, setFilterType] = useState("All")
    const [filterStatus, setFilterStatus] = useState("All")
    const [filterApplied, setFilterApplied] = useState("")
    const [filterStart, setFilterStart] = useState("")
    const [filterEnd, setFilterEnd] = useState("")

    // Filter logic
    const filteredHistory = leaveHistory.filter(item =>
        (filterType === "All" || item.type === filterType) &&
        (filterStatus === "All" || item.status === filterStatus) &&
        (filterApplied === "" || item.applied === filterApplied) &&
        (filterStart === "" || item.start === filterStart) &&
        (filterEnd === "" || item.end === filterEnd)
    )

    // Dynamic empty message
    const noLeaveMessage = () => 
    {
        let message = "No leave records found"
        if (filterType !== "All") message += ` of type "${filterType}"`
        if (filterStatus !== "All") message += ` with status "${filterStatus}"`
        if (filterApplied) message += ` applied on "${filterApplied}"`
        if (filterStart) message += ` starting from "${filterStart}"`
        if (filterEnd) message += ` ending on "${filterEnd}"`
        message += ". Try adjusting your filters."
        return message
    }

    //Defining the headers
    const headers = [
        { label: "Leave Type" },
        { label: "Application Date" },
        { label: "Start Date" },
        { label: "End Date" },
        { label: "Days" },
        { label: "Status" },
        { label: "Action", center: true }
    ]

    const renderRows = (item, idx, tdStyling) => (
        <>
            <td className={tdStyling}>{item.type}</td>
            <td className={tdStyling}>{item.applied}</td>
            <td className={tdStyling}>{item.start}</td>
            <td className={tdStyling}>{item.end}</td>
            <td className={tdStyling}>{item.days}</td>
            <td className={tdStyling}>
                <div className={`badge ${item.status === "Approved" ? "badge-success" : item.status === "Pending" ? "badge-warning" : "badge-error"} text-white`}>
                    {item.status}
                </div>
            </td>
            <td className={`${tdStyling} flex justify-center items-center`}>
                <button className="btn btn-primary text-white" onClick={()=> navigate(`/dashboard/leave/my-leave/${item.id}`)} title="Click to view details">View</button>
            </td>
        </>
    )

    //Common stylings
    const select = "select select-bordered select-neutral w-full bg-white"
    const inputStyling = "input input-neutral input-bordered w-full bg-inherit"
    const filtersContainerStyling = "flex flex-1 flex-col gap-1"
    const labelStyling = "text-sm font-medium"

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Leave History</h2>
                <Link to={"/dashboard/leave/new"} className="btn btn-primary text-white">Apply leave</Link>
            </div>

            {/* LEAVE BALANCE CARDS */}
            <LeaveBalanceCards userGender={userGender}/>

            {/* FILTERS */}
            <div className="flex flex-col md:flex-row gap-3 px-1 my-3">
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Filter by leave type</label>
                    <select className={select} value={filterType} onChange={e => setFilterType(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Normal">Normal</option>
                        <option value="Sick">Sick</option>
                        <option value="Paternity">Paternity</option>
                        <option value="Maternity">Maternity</option>
                    </select>
                </div>
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Filter by status</label>
                    <select className={select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>
                </div>

                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Application date</label>
                    <input type="date" className={inputStyling} value={filterApplied} onChange={e => setFilterApplied(e.target.value)} />
                </div>
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>Start date</label>
                    <input type="date" className={inputStyling} value={filterStart} onChange={e => setFilterStart(e.target.value)} />
                </div>
                <div className={filtersContainerStyling}>
                    <label className={labelStyling}>End date</label>
                    <input type="date" className={inputStyling} value={filterEnd} onChange={e => setFilterEnd(e.target.value)} />
                </div>
            </div>

            {/* TABLE */}
            <Table headers={headers} data={filteredHistory} emptyMessage={leaveHistory.length === 0 ? "No leave records found" : noLeaveMessage()} renderRow={renderRows} />
        </>
    )
}

export default MyLeave