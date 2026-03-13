import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

import Table from "../../../Components/Table"

const LeaveDetails = () => 
{
    const navigate = useNavigate()

    // Dummy data (replace with API data)
    const leave = 
    {
        employeeName: "Samuel Ndungu",
        leaveType: "Annual Leave",
        startDate: "2025-02-15",
        endDate: "2025-02-20",
        totalDays: 5,
        reason: "Going for a family event.",
        fileAttachment: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

        approvals: 
        {
            hod: 
            { 
                approved: false, 
                rejected: true,
                approverName: "John Mwangi", 
                date: "2025-02-10",
                rejectionReason: "Work assigned not completed."
            },
            gm: 
            { 
                approved: false, 
                rejected: false,
                approverName: "Samuel Muigai", 
                date: "2025-12-01",
                rejectionReason: null
            },
            hr: 
            { 
                approved: false, 
                rejected: false,
                approverName: "Mary Wanjiru", 
                date: "2025-02-11",
                rejectionReason: null
            }
        },

        leaveDaysBreakdown: [
            { date: "2025-02-15", type: "Half day" },
            { date: "2025-02-17", type: "Full day" },
            { date: "2025-02-18", type: "Full day" },
            { date: "2025-02-19", type: "Half day" },
            { date: "2025-02-20", type: "Full day" }
        ],

        handOver: 
        {
            employeeName: "Brian Kamau",
            tasks: [
                "Submit weekly sprint report",
                "Hand over frontend tasks to John Doe",
                "Complete UI bug fixes before travel"
            ]
        }
    }

    const Section = ({ title, children }) => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="md:text-xl font-semibold text-gray-800 mb-4 underline">{title}</h2>
            {children}
        </div>
    )

    const GridItem = ({ label, value }) => (
        <div className="flex flex-col">
            <span className="text-gray-400 text-xs">{label}</span>
            <span className="text-gray-900 font-medium">{value || "—"}</span>
        </div>
    )

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

    const ViewFile = ({ file }) => 
    {
        if (!file) return <span className="text-gray-500">—</span>
        return (
            <Link className="link link-info" onClick={() => window.open(file, "_blank")}>View File</Link>
        )
    }

    const ApprovalStatusCard = ({ role, data, previousApproved, previousRejected }) => 
    {
        const approved = data.approved
        const rejected = data.rejected

        let statusMessage = ""

        if (rejected) 
        {
            statusMessage = `Rejected by ${data.approverName} on ${data.date}`
        } 
        else if (approved) 
        {
            statusMessage = `Approved by ${data.approverName} on ${data.date}`
        } 
        else if (previousRejected) 
        {
            statusMessage = `Cannot approve. Previous step rejected.`
        } 
        else if (!previousApproved) 
        {
            statusMessage = `Pending ${role} approval (Waiting for previous approval)`
        } 
        else 
        {
            statusMessage = `Pending ${role} approval`
        }

        // Determine card background based on status
        let cardBg = ""
        if (approved) cardBg = "bg-green-50 border-green-200"
        else if (rejected) cardBg = "bg-red-50 border-red-200"
        else if (previousRejected) cardBg = "bg-gray-100 border-gray-300" // different color for blocked due to rejection
        else cardBg = "bg-yellow-50 border-yellow-200"

        return (
            <div className={`p-4 border rounded-xl shadow-sm flex items-start gap-3 ${cardBg}`}>
                <div className="text-2xl">
                    {
                        approved && <FaCheckCircle className="text-green-600" />
                    }
                    {
                        rejected && <FaTimesCircle className="text-red-600" />
                    }
                    {
                        !approved && !rejected && !previousRejected && <FaClock className="text-yellow-600" />
                    }
                    {
                        !approved && !rejected && previousRejected && <FaTimesCircle className="text-gray-400" />
                    }
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800">{role}</h3>
                    <p className={`text-sm mt-1 ${approved ? "text-green-700" : rejected ? "text-red-700" : previousRejected ? "text-gray-700" : "text-yellow-700"}`}>{statusMessage}</p>
                    {
                        rejected && data.rejectionReason && (
                            <p className="text-sm text-red-600 mt-1">
                                <span className="font-medium">Reason:</span> {data.rejectionReason}
                            </p>
                        )
                    }
                </div>
            </div>
        )
    }


    return (
        <div className="space-y-3">
            {/* Back Button */}
            <div className="flex justify-end">
                <button className="btn btn-success text-white" onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* APPROVAL STATUS */}
            <Section title="Approval Status">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <ApprovalStatusCard role="HOD" data={leave.approvals.hod} previousApproved={true} previousRejected={false} />
                    <ApprovalStatusCard role="GM" data={leave.approvals.gm} previousApproved={leave.approvals.hod.approved} previousRejected={leave.approvals.hod.rejected} />
                    <ApprovalStatusCard role="HR" data={leave.approvals.hr} previousApproved={leave.approvals.gm.approved} previousRejected={leave.approvals.hod.rejected || leave.approvals.gm.rejected} />
                </div>
            </Section>

            {/* Leave Details + Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Section title="Leave Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <GridItem label="Employee Name" value={leave.employeeName} />
                        <GridItem label="Leave Type" value={leave.leaveType} />
                        <GridItem label="Start Date" value={leave.startDate} />
                        <GridItem label="End Date" value={leave.endDate} />
                        <GridItem label="Total Days" value={leave.totalDays} />
                        <GridItem label="Reason" value={leave.reason} />
                        <GridItem label="File Attachment" value={<ViewFile file={leave.fileAttachment} />} />
                    </div>
                </Section>

                <Section title="Leave Days Breakdown">
                    <Table headers={breakdownHeaders} data={leave.leaveDaysBreakdown} renderRow={renderBreakdownRow} emptyMessage={"No leave days breakdown available."} />
                </Section>
            </div>

            {/* Handover */}
            <Section title="Handover Details">
                {
                    leave.handOver 
                    ? 
                        <div className="space-y-2">
                            <p className="text-md">Handed over to: <span className="font-medium">{leave.handOver.employeeName}</span></p>
                            <p className="text-md">Tasks:</p>
                            <ul className="list-disc pl-6 text-gray-800 space-y-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

        </div>
    )
}

export default LeaveDetails