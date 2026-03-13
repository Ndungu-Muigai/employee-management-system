import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

import Table from "../../Components/Table"

const Employee = () => 
{
    const navigate = useNavigate()

    const [employee] = useState(
    {
        surname: "Muigai",
        firstName: "Samuel",
        lastName: "Ndungu",
        email: "muigaisam65@gmail.com",
        idNo: "12345678",
        dob: "2001-05-18",
        gender: "Male",
        maritalStatus: "Single",
        phoneNumber: "+254 707 251073",
        profileImage: "https://picsum.photos/600/400",
        qualifications: [
            { level: "Bachelors", field: "Telecommunications", institution: "Strathmore University" },
            { level: "Certificate", field: "Software Engineering", institution: "Moringa School" }
        ],
        employmentDetails: 
        {
            country: "Kenya",
            branch: "Nairobi HQ",
            department: "Software Development",
            role: "Frontend Developer",
            employmentType: "Full-time",
            startDate: "2024-01-10",
            hod: "John Doe",
            gm: "Jane Kamau"
        },
        bankDetails: 
        {
            bankName: "Equity Bank",
            branchName: "Westlands Branch",
            accountNumber: "0123456789",
            kra: "A123456789Z",
            nssf: "NSSF12345",
            nhif: "NHIF98432"
        },
        uploads: 
        {
            cv: "#",
            terms: "#",
            bankStatement: "#",
            kra: "#",
            nssf: "#",
            nhif: "#",
            educationFiles: ["#", "#"],
            others: ["#"]
        }
    })

    //State to keep track of opening and closing of the edit modal
    const [editModalOpen, setEditModalOpen] = useState(false)

    const Section = ({ title, children }) => (
        <div className="bg-white p-5 rounded-xl shadow-md w-full">
            <h2 className="text-lg font-bold text-center text-gray-800 mb-4 border-b pb-2">{title}</h2>
            {children}
        </div>
    )

    const GridItem = ({ label, value }) => (
        <div className="flex flex-col">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="text-gray-800 font-medium">{value || "—"}</span>
        </div>
    )

    // Table config for qualifications
    const headers = [
        { label: "#" },
        { label: "Level" },
        { label: "Field" },
        { label: "Institution" }
    ]

    const renderQualificationRow = (q, idx, td) => (
        <>
            <td className={td}>{idx + 1}</td>
            <td className={td}>{q.level}</td>
            <td className={td}>{q.field}</td>
            <td className={td}>{q.institution}</td>
        </>
    )

    //Helper functions to get the user's initials to be used in the profile image if it's not there
    const getInitials = (first, last) => 
    {
        const f = first?.charAt(0)?.toUpperCase() || ""
        const l = last?.charAt(0)?.toUpperCase() || ""
        return f + l
    }

    //Function to disable the user's account
    const disableAccount = () =>
    {
        Swal.fire(
        {
            title: `Disable ${employee.firstName} ${employee.lastName}'s account?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, disable",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545"
        })
        .then(result => 
        {
            if (result.isConfirmed) 
            {
                navigate(-1)
                toast.success("Account disabled successfully!") 
            }
        })
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center gap-2 mb-4">
                <button onClick={() => navigate(-1)} className="btn btn-success text-white">Back</button>
                <h1 className="text-2xl font-bold text-gray-800 hidden md:block">Employee Profile</h1>
                <div className="flex gap-3">
                    <button className="btn btn-primary text-white" onClick={()=> setEditModalOpen(true)}>Edit Info</button>
                    <button className="btn btn-error text-white" onClick={disableAccount}>Disable Account</button>
                </div>
            </div>

            {/* Top Grid: Personal Info + Employment/Payroll */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
                {/* LEFT COLUMN */}
                {/* Personal Info */}
                <Section title="Personal Information">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                        {/* Profile Image / Initials */}
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center text-4xl font-semibold shadow-md mb-2">
                            {
                                employee?.profileImage 
                                ? 
                                    <img src={employee?.profileImage} alt="Profile" className="w-full h-full object-cover"/> 
                                : 
                                    getInitials(employee?.firstName, employee?.surname)
                            }
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="font-medium text-gray-800">{employee.firstName} {employee.lastName}</p>
                            <p className="text-gray-500">{employee.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                        <GridItem label="Surname" value={employee.surname} />
                        <GridItem label="First Name" value={employee.firstName} />
                        <GridItem label="Last Name" value={employee.lastName} />
                        <GridItem label="Email Address" value={employee.email} />
                        <GridItem label="Phone" value={employee.phoneNumber} />
                        <GridItem label="Gender" value={employee.gender} />
                        <GridItem label="Marital Status" value={employee.maritalStatus} />
                        <GridItem label="Date of Birth" value={employee.dob} />
                        <GridItem label="ID No" value={employee.idNo} />
                    </div>
                </Section>

                {/* RIGHT COLUMN */}
                <div className="space-y-7">
                    {/* Employment Details */}
                    <Section title="Employment Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <GridItem label="Country" value={employee.employmentDetails.country} />
                            <GridItem label="Branch" value={employee.employmentDetails.branch} />
                            <GridItem label="Department" value={employee.employmentDetails.department} />
                            <GridItem label="Role" value={employee.employmentDetails.role} />
                            <GridItem label="Employment Type" value={employee.employmentDetails.employmentType} />
                            <GridItem label="Start Date" value={employee.employmentDetails.startDate} />
                            <GridItem label="HOD" value={employee.employmentDetails.hod} />
                            <GridItem label="GM" value={employee.employmentDetails.gm} />
                        </div>
                    </Section>

                    {/* Payroll / Bank */}
                    <Section title="Payroll Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <GridItem label="Bank Name" value={employee.bankDetails.bankName} />
                            <GridItem label="Branch Name" value={employee.bankDetails.branchName} />
                            <GridItem label="Account Number" value={employee.bankDetails.accountNumber} />
                            <GridItem label="KRA PIN" value={employee.bankDetails.kra} />
                            <GridItem label="NSSF" value={employee.bankDetails.nssf} />
                            <GridItem label="NHIF" value={employee.bankDetails.nhif} />
                        </div>
                    </Section>
                </div>
            </div>

            {/* Qualifications Table - Full Width */}
            <Section title="Qualifications">
                {
                    employee.qualifications.length > 0 
                    ? 
                        <Table headers={headers} data={employee.qualifications} emptyMessage="No qualifications added." renderRow={renderQualificationRow}/>
                    : 
                        <p className="text-gray-600">No qualifications added.</p>
                }
            </Section>

            {/* Uploaded Files */}
            <Section title="Uploaded Files">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    [["CV", employee.uploads.cv], ["Employment Terms", employee.uploads.terms], ["Bank Statement", employee.uploads.bankStatement], ["KRA Document", employee.uploads.kra], ["NSSF Document", employee.uploads.nssf], ["NHIF Document", employee.uploads.nhif]].map(([label, file], i) => 
                        <GridItem key={i} label={label} value={<a href={file} className="text-blue-600 underline">View File</a>} />
                    )
                }

                {
                    employee.uploads.educationFiles.map((file, index) => 
                        <GridItem key={index} label={`Education File ${index + 1}`} value={<a href={file} className="text-blue-600 underline">View File</a>} />
                    )
                }

                {
                    employee.uploads.others.map((file, index) =>
                        <GridItem key={index} label={`Other File ${index + 1}`} value={<a href={file} className="text-blue-600 underline">View File</a>} />
                    )
                }
                </div>
            </Section>
        </div>
    )
}

export default Employee