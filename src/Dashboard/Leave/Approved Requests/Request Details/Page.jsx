import { Link, useNavigate } from "react-router-dom"
import Table from "../../../Components/Table"

const ApprovedRequestDetails = () => 
{
    const navigate = useNavigate()

    // Dummy Approved Leave Data
    const leave = 
    {
        employeeName: "Lucy Muthoni",
        leaveType: "Annual Leave",
        startDate: "2025-03-01",
        endDate: "2025-03-10",
        totalDays: 10,
        reason: "Traveling for a family vacation.",
        approvals: {
            HOD: { name: "Peter Kamau", date: "2025-02-18" },
            HR: { name: "James Kariuki", date: "2025-02-19" },
            GM: { name: "Susan Njeri", date: "2025-02-20" }
        },
        fileAttachment: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

        leaveDaysBreakdown: [
            { date: "2025-03-01", type: "Full day" },
            { date: "2025-03-03", type: "Full day" },
            { date: "2025-03-04", type: "Full day" },
            { date: "2025-03-06", type: "Full day" },
            { date: "2025-03-10", type: "Full day" }
        ],

        handOver: 
        {
            employeeName: "Brian Kamau",
            tasks: [
                "Weekly system health report",
                "Respond to client support emails",
                "Monitor the backup server"
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

    const breakdownHeaders = [
        { label: "#" },
        { label: "Date" },
        { label: "Duration" }
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

        const handleView = () => 
        {
            let url = file

            if (file.startsWith("data:")) 
            {
                const byteString = atob(file.split(",")[1])
                const mimeString = file.split(",")[0].split(":")[1].split(";")[0]
                const ab = new ArrayBuffer(byteString.length)
                const ia = new Uint8Array(ab)

                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i)
                }

                const blob = new Blob([ab], { type: mimeString })
                url = URL.createObjectURL(blob)
            }

            window.open(url, "_blank")
        }

        return (
            <Link className="link link-info" onClick={handleView}>View File</Link>
        )
    }

    return (
        <div className="space-y-4">

            {/* Back Button */}
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
                        <GridItem label="File Attachment" value={<ViewFile file={leave.fileAttachment} />} />
                    </div>
                </Section>

                {/* Leave Days Breakdown */}
                <Section title="Leave Days Breakdown">
                    {
                        leave.leaveDaysBreakdown?.length > 0 
                        ? 
                            <Table headers={breakdownHeaders} data={leave.leaveDaysBreakdown} renderRow={renderBreakdownRow} emptyMessage={"No breakdown available."}/>
                        : 
                            <p className="text-gray-600">No leave days breakdown available.</p>
                    }
                </Section>

            </div>

            {/* Handover & Approval Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Handover Section */}
                <Section title="Handover Details">
                    {
                        leave.handOver 
                        ? 
                            <div className="space-y-3">
                                <GridItem label="Employee Name" value={leave.handOver.employeeName} />
                                <div>
                                    <span className="text-gray-400 text-sm">Tasks</span>
                                    <ul className="list-disc pl-6 space-y-1 text-gray-800 mt-1">
                                        {leave.handOver.tasks.map((task, index) => (
                                            <li key={index}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        : 
                            <p className="text-gray-600">No handover tasks provided.</p>
                    }
                </Section>

                {/* Approval Section */}
                <Section title="Approval Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* HOD */}
                        <div className="space-y-1">
                            <span className="text-gray-400 text-sm">HOD</span>
                            <div>
                                <span className="font-medium">Name: </span>
                                <span className="text-gray-900">{leave.approvals.HOD.name}</span>
                            </div>
                            <div>
                                <span className="font-medium">Approval Date: </span>
                                <span className="text-gray-900">{leave.approvals.HOD.date}</span>
                            </div>
                        </div>

                        {/* HR */}
                        <div className="space-y-1">
                            <span className="text-gray-400 text-sm">HR</span>
                            <div>
                                <span className="font-medium">Name: </span>
                                <span className="text-gray-900">{leave.approvals.HR.name}</span>
                            </div>
                            <div>
                                <span className="font-medium">Approval Date: </span>
                                <span className="text-gray-900">{leave.approvals.HR.date}</span>
                            </div>
                        </div>

                        {/* GM */}
                        <div className="space-y-1">
                            <span className="text-gray-400 text-sm">GM</span>
                            <div>
                                <span className="font-medium">Name: </span>
                                <span className="text-gray-900">{leave.approvals.GM.name}</span>
                            </div>
                            <div>
                                <span className="font-medium">Approval Date: </span>
                                <span className="text-gray-900">{leave.approvals.GM.date}</span>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    )
}

export default ApprovedRequestDetails
