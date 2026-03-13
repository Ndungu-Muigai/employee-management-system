/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table"

const PendingLeaveRequests = () => 
{
    const navigate = useNavigate()

    // Dummy data
    const dummyData = [
        {
            id: 1,
            employee_name: "John Doe",
            leave_type: "Annual",
            start_date: "2025-02-01",
            end_date: "2025-02-05",
            total_days: 5,
        },
        {
            id: 2,
            employee_name: "Mary Wanjiku",
            leave_type: "Sick",
            start_date: "2025-02-10",
            end_date: "2025-02-12",
            total_days: 3,
        },
        {
            id: 3,
            employee_name: "Peter Mwangi",
            leave_type: "Maternity",
            start_date: "2025-01-20",
            end_date: "2025-03-20",
            total_days: 60,
        },
    ]

    const [pendingRequests, setPendingRequests] = useState([])

    // FILTER STATES
    const [searchName, setSearchName] = useState("")
    const [filterType, setFilterType] = useState("All")
    const [filterStart, setFilterStart] = useState("")
    const [filterEnd, setFilterEnd] = useState("")

    // Load dummy data
    useEffect(() => {
        setPendingRequests(dummyData)
    }, [])

    // FILTER LOGIC
    const filteredRequests = pendingRequests.filter(req =>
        (searchName === "" || req.employee_name.toLowerCase().includes(searchName.toLowerCase())) &&
        (filterType === "All" || req.leave_type === filterType) &&
        (filterStart === "" || req.start_date >= filterStart) &&
        (filterEnd === "" || req.end_date <= filterEnd)
    )

    let customMessage = ""
    if (pendingRequests.length > 0 && filteredRequests.length === 0) 
    {
        let parts = []

        if (searchName) 
        {
            parts.push(`with employee name "${searchName}"`)
        } 
        if (filterType !== "All") 
        {
            parts.push(`with leave type "${filterType}"`)
        } 
        if (filterStart) 
        {
            parts.push(`with the start date on or after "${filterStart}"`)
        } 
        if (filterEnd) 
        {
            parts.push(`with the end date on or before "${filterEnd}"`)
        } 

        if (parts.length > 0) 
        {
            customMessage = "No pending requests found " + parts.join(" and ") + ". Try adjusting your filters."
        } 
        else 
        {
            customMessage = "No pending requests match your filters."
        }
    }

    // COMMON STYLING
    const select = "select select-bordered select-neutral w-full bg-white"
    const input = "input input-neutral input-bordered w-full bg-inherit"
    const container = "flex flex-1 flex-col gap-1"
    const label = "text-sm font-medium"

    //Defining the headers to be passed on to the table component
    const headers = [
        { label: "#"},
        { label: "Employee Name" },
        { label: "Leave Type" },
        { label: "Start Date" },
        { label: "End Date" },
        { label: "Number of Days", center: true },
        { label: "Status", center: true },
        { label: "Action", center: true }
    ]

    const renderRows = (req, idx, tdStyling) => (
        <>
            <td className={tdStyling}>{req.id}</td>
            <td className={tdStyling}>{req.employee_name}</td>
            <td className={tdStyling}>{req.leave_type}</td>
            <td className={tdStyling}>{req.start_date}</td>
            <td className={tdStyling}>{req.end_date}</td>
            <td className={`${tdStyling} text-center`}>{req.total_days}</td>
            <td className={`${tdStyling} text-center`}>
                <div className="badge badge-warning">Pending</div>
            </td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/leave/pending-requests/${req.id}`)}>View</button>
            </td>
        </>
    )

    return (
        <>
            <h1 className="text-gray-800 mb-4 text-center font-bold text-xl md:text-3xl xl:text-4xl">Pending Leave Requests</h1>

            {/* SEARCH + FILTER GRID */}
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
                    <input type="date" className={input} value={filterStart} onChange={e => setFilterStart(e.target.value)}/>
                </div>

                {/* End Date */}
                <div className={container}>
                    <label className={label}>End Date</label>
                    <input type="date" className={input} value={filterEnd} onChange={e => setFilterEnd(e.target.value)}/>
                </div>
            </div>

            <Table headers={headers} data={filteredRequests} emptyMessage={customMessage || "No pending requests found."} renderRow={renderRows}
            />
        </>
    )
}

export default PendingLeaveRequests