import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import AddBranchModal from "../New/Add" 
import { useNavigate } from "react-router-dom"
import Table from "../../../Components/Table"
import { getCountryName } from "../../../Utils/CountryName"

const Branches = () => 
{
    const navigate = useNavigate()

    //State to store the countries created for the company
    const [countries, setCountries] = useState([])

    const [branches, setBranches] = useState([])
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [loadingBranches, setLoadingBranches] = useState(true)
    const [loadingCountries, setLoadingCountries] = useState(true)


    //Function to fetch the list of countries from the backend
    const fetchCountries = async () =>
    {
        try 
        {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/countries`)
            const data = await response.json()
            if (!Array.isArray(data)) 
            {
                setCountries([])
                return
            }
            setCountries(data)
        } 
        catch (error) 
        {
            console.error("Error fetching countries:", error)
            toast.error("Failed to fetch countries")
        }
        finally 
        {
            setLoadingCountries(false)
        }
    }

    //Fetching the branches from the backend
    const fetchBranches = async () =>
    {
        try 
        {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/branches`)
            const data = await response.json()
            if (!Array.isArray(data)) 
            {
                setBranches([])
                return
            }
            setBranches(data)
        } 
        catch (error) 
        {
            console.error("Error fetching branches:", error)
            toast.error("Failed to fetch branches")
        }
        finally 
        {
            setLoadingBranches(false)
        }
    }

    useEffect(() => 
    {
        fetchCountries()
        fetchBranches()
    }, [])

    // Function to add a new branch
    const handleAddBranch = (savedBranch) =>
    {
        // Convert backend output to expected format
        const formatted =
        {
            id: savedBranch.id,
            name: savedBranch.name,
            country: savedBranch.country.name,
            employeeCount: 0,
            departmentCount: 0
        }

        setBranches([...branches, formatted])
    }

    const tdStyling = "border border-gray-200 p-3"

    //Table headers configuration
    const headers = [
        { label: "Branch" },
        { label: "Country" },
        { label: "Employees" },
        { label: "Departments" },
        { label: "Action", center: true }
    ]

    const renderBranchesRow = (branch, td) =>(
        <>
            <td className={td}>{branch.name}</td>
            <td className={td}>{getCountryName(branch.country)}</td>
            <td className={td}>{branch.employeeCount}</td>
            <td className={td}>{branch.departmentCount}</td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/settings/branches/${branch.id}`)}>View</button>
            </td>
        </>
    )

    return (
        <>
            {/* Header with Add button on the left */}
            <div className="flex justify-end items-center mb-4">
                <button className="btn btn-success text-white" onClick={() => setAddModalOpen(true)} disabled={loadingCountries}>Add Branch</button>
            </div>

            {/* Branches Table */}
            <Table headers={headers} data={branches} emptyMessage={"No branches found. Click Add Branch to get started."} renderRow={renderBranchesRow} loading={loadingBranches}/>

            {/* Add Branch Modal */}
            <AddBranchModal addModalOpen={addModalOpen} closeAddModal={() => setAddModalOpen(false)} addBranch={handleAddBranch} countries={countries}/>
        </>
    )
}

export default Branches
