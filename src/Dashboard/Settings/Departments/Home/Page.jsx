import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import AddDepartmentModal from "../New/Page"
import { getCountryName } from "../../../Utils/CountryName"
import Table from "../../../Components/Table"

const Departments = () => 
{
    const navigate = useNavigate()

    const [departments, setDepartments] = useState([])
    const [branches, setBranches] = useState([])
    const [addModalOpen, setAddModalOpen] = useState(false)

    const [loadingDepartments, setLoadingDepartments] = useState(true)
    const [loadingBranches, setLoadingBranches] = useState(true)

    const [errorDepartments, setErrorDepartments] = useState(false)

    // Fetch departments
    const fetchDepartments = async () => 
    {
        setLoadingDepartments(true)
        setErrorDepartments(false)
        try 
        {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/departments`)
            const data = await res.json()
            if (!Array.isArray(data)) 
            {
                setDepartments([])
                return
            }
            setDepartments(data)
        } 
        catch (err) 
        {
            setDepartments([])
            toast.error(`Error fetching departments: ${err.message}`)
        } 
        finally 
        {
            setLoadingDepartments(false)
        }
    }

    // Fetch branches
    const fetchBranches = async () => 
    {
        setLoadingBranches(true)
        try 
        {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/branches`)
            const data = await res.json()
            if (!Array.isArray(data)) 
            {
                setBranches([])
                return
            }
            setBranches(data)
        } 
        catch (err) 
        {
            setBranches([])
            toast.error(`Error fetching branches: ${err.message}`)
        } 
        finally 
        {
            setLoadingBranches(false)
        }
    }

    useEffect(() => 
    {
        fetchDepartments()
        fetchBranches()
    }, [])

    const tdStyling = "border border-gray-200 p-3"

    const headers = [
        { label: "Department" },
        { label: "Branch" },
        { label: "Country" },
        { label: "Action", center: true },
    ]

    const renderDepartmentsRow = (department, td) => (
        <>
            <td className={td}>{department.name}</td>
            <td className={td}>{department.branch}</td>
            <td className={td}>{getCountryName(department.country)}</td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/settings/departments/${department.id}`)}>View</button>
            </td>
        </>
    )

    return (
        <>
            <div className="flex justify-end items-center mb-4">
                <button className="btn btn-success text-white" onClick={() => setAddModalOpen(true)} disabled={loadingBranches}>Add Department</button>
            </div>

            <Table headers={headers} data={departments} renderRow={renderDepartmentsRow} emptyMessage={ errorDepartments ? "Failed to load departments." : "No departments found. Click Add Department to get started."} loading={loadingDepartments}/>

            <AddDepartmentModal addModalOpen={addModalOpen} closeAddModal={() => setAddModalOpen(false)} branches={branches} onDepartmentAdded={(newDept) => setDepartments((prev) => [...prev, newDept])}/>
        </>
    )
}

export default Departments
