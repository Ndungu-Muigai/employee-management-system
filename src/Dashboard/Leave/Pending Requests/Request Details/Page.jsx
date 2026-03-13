import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

import Table from "../../../Components/Table"

const PendingRequestDetails = () => 
{
    const navigate = useNavigate()

    // Dummy data
    const leave = 
    {
        employeeName: "Samuel Ndungu",
        leaveType: "Annual Leave",
        startDate: "2025-02-15",
        endDate: "2025-02-20",
        totalDays: 5,
        reason: "Going for a family event.",
        fileAttachment: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        leaveDaysBreakdown: [
            { date: "2025-02-15", type: "Half day" },
            { date: "2025-02-17", type: "Full day" },
            { date: "2025-02-18", type: "Full day" },
            { date: "2025-02-19", type: "Half day" },
            { date: "2025-02-20", type: "Full day" }
        ],
        handOver: {
            employeeName: "Brian Kamau",
            tasks: [
                "Submit weekly sprint report",
                "Hand over frontend tasks to John Doe",
                "Complete UI bug fixes before travel"
            ]
        },
    }

    const Section = ({ title, children }) => (
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm w-full">
            <h2 className="text-xl text-center font-bold text-gray-700 mb-4 border-b pb-2">{title}</h2>
            {children}
        </div>
    )

    const GridItem = ({ label, value }) => (
        <div className="flex flex-col">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-gray-900 font-medium">{value || "—"}</span>
        </div>
    )

    // Table headers for Leave Days Breakdown
    const breakdownHeaders = [
        { label: "#" },
        { label: "Date" },
        { label: "Day" }
    ]

    const renderBreakdownRow = (row, idx, td) => (
        <>
            <td className={td}>{idx + 1}</td>
            <td className={td}>{row.date}</td>
            <td className={td}>{row.type}</td>
        </>
    )

    //Function to convert the file attachment into a blob
    const ViewFile = ({ file }) => 
    {
        if (!file) return <span className="text-gray-500">—</span>

        const handleView = () => 
        {
            let url = file

            // If base64, convert to blob URL
            if (file.startsWith("data:")) 
            {
                const byteString = atob(file.split(",")[1])
                const mimeString = file.split(",")[0].split(":")[1].split("")[0]
                const ab = new ArrayBuffer(byteString.length)
                const ia = new Uint8Array(ab)

                for (let i = 0; i < byteString.length; i++) 
                {
                    ia[i] = byteString.charCodeAt(i)
                }

                const blob = new Blob([ab], { type: mimeString })
                url = URL.createObjectURL(blob)
            }

            // Open the file in a new tab
            window.open(url, "_blank")
        }

        return (
            <Link className="link link-info" onClick={handleView}>View File</Link>
        )
    }

    const approveRequest = () => 
    {
        Swal.fire(
        {
            title: "Approve leave request?",
            text: "Are you sure you want to approve this leave request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, approve",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545"
        })
        .then(result => 
        {
            if (result.isConfirmed) 
            {
                navigate(-1)
                toast.success("Request approved successfully!")
            }
        })
    }

    const rejectRequest = () => 
    {
        Swal.fire(
        {
            title: "Reject leave request?",
            text: "Are you sure you want to reject this leave request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d"
        })
        .then(result => 
        {
            if (result.isConfirmed) 
            {
                navigate(-1)
                toast.success("Request rejected successfully!")
            }
        })
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-end items-center mb-2">
                <button className="btn btn-success text-white" onClick={() => navigate(-1)}>Back</button>
            </div>
            {/* Top Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leave Details */}
                <Section title="Leave Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <GridItem label="Employee Name" value={leave.employeeName} />
                        <GridItem label="Leave Type" value={leave.leaveType} />
                        <GridItem label="Start Date" value={leave.startDate} />
                        <GridItem label="End Date" value={leave.endDate} />
                        <GridItem label="Total Days" value={leave.totalDays} />
                        <GridItem label="Reason" value={leave.reason} />
                        <GridItem label="File attachment" value={<ViewFile file={leave.fileAttachment} />} />
                    </div>
                </Section>
                {/* Leave Days Breakdown */}
                <Section title="Leave Days Breakdown">
                    {
                        leave.leaveDaysBreakdown.length > 0 
                        ?
                            <Table headers={breakdownHeaders} data={leave?.leaveDaysBreakdown} renderRow={renderBreakdownRow} emptyMessage={"No leave days breakdown available."}/>
                        : 
                            <p className="text-gray-600">No leave days breakdown available.</p>
                    }
                </Section>
            </div>

            {/* Handover Section - Full Width */}
            <Section title="Handover Details">
                {
                    leave.handOver
                    ?
                        <div className="space-y-3">
                            <h2>Employee name: <span className="text-gray-800 font-medium">{leave.handOver.employeeName}</span></h2>
                            <p>Tasks: </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    leave.handOver.tasks.map((task, index) => (
                                        <li key={index}>{task}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    :
                        <p className="text-gray-600">No handover tasks provided.</p>
                }
            </Section>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                <button className="btn btn-success text-white" onClick={approveRequest}>Approve</button>
                <button className="btn btn-error text-white" onClick={rejectRequest}>Reject</button>
            </div>
        </div>
    )
}

export default PendingRequestDetails