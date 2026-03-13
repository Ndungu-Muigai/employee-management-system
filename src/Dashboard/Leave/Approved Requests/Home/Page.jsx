/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table"

const ApprovedLeaveRequests = () => 
{
    const navigate = useNavigate()

    // Dummy data — Approved Requests
    const dummyData = [
        {
            id: 1,
            employee_name: "Jane Njeri",
            leave_type: "Annual",
            start_date: "2025-01-05",
            end_date: "2025-01-10",
            total_days: 6,
        },
        {
            id: 2,
            employee_name: "Samuel Kamau",
            leave_type: "Sick",
            start_date: "2025-02-02",
            end_date: "2025-02-04",
            total_days: 3,
        },
        {
            id: 3,
            employee_name: "Grace Waweru",
            leave_type: "Paternity",
            start_date: "2025-01-15",
            end_date: "2025-01-22",
            total_days: 8,
        },
    ]

    const [approvedRequests, setApprovedRequests] = useState([])

    // FILTER STATES
    const [searchName, setSearchName] = useState("")
    const [filterType, setFilterType] = useState("All")
    const [filterStart, setFilterStart] = useState("")
    const [filterEnd, setFilterEnd] = useState("")

    // Load data
    useEffect(() => {
        setApprovedRequests(dummyData)
    }, [])

    // FILTER LOGIC
    const filteredRequests = approvedRequests.filter(req =>
        (searchName === "" || req.employee_name.toLowerCase().includes(searchName.toLowerCase())) &&
        (filterType === "All" || req.leave_type === filterType) &&
        (filterStart === "" || req.start_date >= filterStart) &&
        (filterEnd === "" || req.end_date <= filterEnd)
    )

    // Custom message for no results
    let customMessage = ""
    if (approvedRequests.length > 0 && filteredRequests.length === 0) 
    {
        let parts = []

        if (searchName) parts.push(`with employee name "${searchName}"`)
        if (filterType !== "All") parts.push(`with leave type "${filterType}"`)
        if (filterStart) parts.push(`with the start date on or after "${filterStart}"`)
        if (filterEnd) parts.push(`with the end date on or before "${filterEnd}"`)

        if (parts.length > 0) 
        {
            customMessage = "No approved requests found " + parts.join(" and ") + ". Try adjusting your filters."
        } 
        else 
        {
            customMessage = "No approved requests match your filters."
        }
    }

    // COMMON STYLING
    const select = "select select-bordered select-neutral w-full bg-white"
    const input = "input input-neutral input-bordered w-full bg-inherit"
    const container = "flex flex-1 flex-col gap-1"
    const label = "text-sm font-medium"

    //Defining the headers to be passed to the Table component
    const headers = [
        { label: "#" },
        { label: "Employee Name" },
        { label: "Leave Type" },
        { label: "Start Date" },
        { label: "End Date" },
        { label: "Number of Days" },
        { label: "Action", center: true }
    ]

    const renderRows = (req, idx, tdStyling) => (
        <>
            <td className={tdStyling}>{req.id}</td>
            <td className={tdStyling}>{req.employee_name}</td>
            <td className={tdStyling}>{req.leave_type}</td>
            <td className={tdStyling}>{req.start_date}</td>
            <td className={tdStyling}>{req.end_date}</td>
            <td className={tdStyling}>{req.total_days}</td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/leave/approved-requests/${req.id}`)}>View</button>
            </td>
        </>
    )

    return (
        <>
            <h1 className="text-gray-800 mb-4 text-center font-bold text-xl md:text-3xl xl:text-4xl">Approved Leave Requests</h1>

            {/* FILTER GRID */}
            <div className="flex flex-col md:flex-row gap-3 mb-3">

                {/* Search by employee name */}
                <div className={container}>
                    <label className={label}>Search by Employee Name</label>
                    <input type="text" className={input} placeholder="Enter employee name..." value={searchName} onChange={e => setSearchName(e.target.value)}/>
                </div>

                {/* Filter by leave type */}
                <div className={container}>
                    <label className={label}>Filter by Leave Type</label>
                    <select className={select} value={filterType} onChange={e => setFilterType(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Annual">Annual</option>
                        <option value="Sick">Sick</option>
                        <option value="Paternity">Paternity</option>
                        <option value="Maternity">Maternity</option>
                    </select>
                </div>

                {/* Start Date */}
                <div className={container}>
                    <label className={label}>Start Date</label>
                    <input type="date" className={input} value={filterStart}onChange={e => setFilterStart(e.target.value)}/>
                </div>

                {/* End Date */}
                <div className={container}>
                    <label className={label}>End Date</label>
                    <input type="date" className={input} value={filterEnd} onChange={e => setFilterEnd(e.target.value)}/>
                </div>
            </div>

            {/* DATA TABLE */}
            <Table headers={headers} data={filteredRequests}emptyMessage={customMessage || "No approved requests found."} renderRow={renderRows} />
        </>
    )
}

export default ApprovedLeaveRequests
