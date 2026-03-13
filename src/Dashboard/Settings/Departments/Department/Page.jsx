/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"
import ErrorCard from "../../../../Error Page/Page"
import Loader from "../../../Components/Loader"
import Table from "../../../Components/Table"

const Department = () => 
{
    const { id } = useParams()
    
    const navigate = useNavigate()

    // State to store department details
    const [department, setDepartment] = useState({})

    const [loading, setLoading] = useState(true)

    //Fetching the department details based on the id from params
    const fetchDepartmentDetails = async () =>
    {
        setLoading(true)
        //Fetch department details logic here
        try
        {
            // Example fetch call
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/departments/${id}`)
            const data = await response.json()
            setDepartment(data)
        }
        catch (error)
        {
            console.error("Error fetching department details:", error)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(() =>
    {
        fetchDepartmentDetails()
    }, [id])

    // const [subDeptName, setSubDeptName] = useState("")
    // const [modalOpen, setModalOpen] = useState(false)

    //

    // const addSubDepartment = () => 
    // {
    //     if (!subDeptName) return

    //     const newSubDept = 
    //     {
    //         id: Date.now(),
    //         name: subDeptName,
    //     }

    //     setDepartment({...department, subDepartments: [...department.subDepartments, newSubDept],})

    //     setSubDeptName("")
    //     setModalOpen(false)
    // }

    //If loading, show loading state
    if (loading) 
    {
        return (
            <div className="flex items-center justify-center w-full h-40">
                <Loader message={"Loading department details..."} />
            </div>
        )
    }

    //If department not found
    if (!department?.name) 
    {
        return (
            <ErrorCard message={"Department not found."} backLink={'/dashboard/settings/departments'} backLabel={'Back to departments'} />
        )
    }

    return (
        <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold uppercase text-center underline flex-1">{department?.name}</h1>
                <button onClick={() => navigate(-1)} className="btn btn-success text-white">Back</button>
            </div>

            <div className="flex justify-between items-center">
                <p className="font-medium text-xl">Branch: {department.branch}</p>
                <p className="font-medium text-xl">Total Employees: {department?.employees?.length}</p>
            </div>

            {/* Employees Table */}
            <Table
                headers={[{ label: "Employee Name", center: false }, { label: "Position", center: false }]}
                data={department?.employees || []}
                renderRow={(emp, idx, tdStyling) => (
                    <>
                        <td className={tdStyling}>{emp.name}</td>
                        <td className={tdStyling}>{emp.position}</td>
                    </>
                )}
                emptyMessage="No employees found in this department."
                idKey="id"
            />

            {/* Sub-Departments Section */}
            {/* <div className="flex justify-between items-center mt-6">
                <h2 className="text-xl font-semibold">Sub-Departments</h2>
                <button className="btn btn-primary text-white" onClick={() => setModalOpen(true)}>Add Sub-Department</button>
            </div> */}

            {/* Sub-Departments Table */}
            {/* <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm max-h-[40vh]">
                <table className="table table-pin-rows w-full">
                    <thead className="text-sm uppercase text-white bg-gray-100">
                        <tr>
                            <th className={thStyling}>Sub-Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            department.subDepartments.length === 0
                            ?
                                <tr>
                                    <td className={`${tdStyling} text-center font-semibold`}>No sub-departments added yet.</td>
                                </tr>
                            :
                                department.subDepartments.map((sub, index) => 
                                {
                                    return(
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className={tdStyling}>{sub.name}</td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div> */}

            {/* Add Sub-Department Modal */}
            {/* {
                modalOpen && 
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Add Sub-Department</h2>
                                <button onClick={() => setModalOpen(false)}>
                                    <FaX className="hover:text-red-500" size={18} title="Close" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Sub-Department Name</label>
                                    <input type="text" value={subDeptName} onChange={(e) => setSubDeptName(e.target.value)} className="input input-neutral bg-inherit w-full" placeholder="Enter sub-department name" />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                                    <button className="btn btn-primary text-white" onClick={addSubDepartment}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
            } */}
        </div>
    )
}

export default Department