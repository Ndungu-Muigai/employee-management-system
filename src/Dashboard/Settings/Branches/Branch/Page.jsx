/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import {getCountryName} from "../../../Utils/CountryName"
import ErrorCard from "../../../../Error Page/Page"
import Loader from "../../../Components/Loader"
import Table from "../../../Components/Table"

const Branch = () => 
{
    const { id } = useParams()
    const navigate = useNavigate()

    //State to store the branch data
    const [branchData, setBranchData] = useState(null)
    const [loading, setLoading] = useState(true)

    //Fetch branch data based on id from params
    const fetchBranchData = async () => 
    {
        setLoading(true)
        try 
        {
            const branchData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/branches/${id}`)   
            const data = await branchData.json()
            setBranchData(data)
        }
        catch (error) 
        {
            toast.error("Error fetching branch data:", error)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(() => 
    {
        fetchBranchData()
    }, [id])

    if (loading) 
    {
        return (
            <div className="flex items-center justify-center w-full h-40">
                <Loader message={"Loading branch details..."} />
            </div>
        )
    }

    if (!branchData?.name) 
    {
        return (
            <ErrorCard message={"Branch not found."} backLink={'/dashboard/settings/branches'} backLabel={'Back to branches'} />
        )
    }

    if (!branchData) 
    {
        return (
            <ErrorCard message={"Branch data is invalid."} backLink={'/dashboard/settings/branches'} backLabel={'Back to branches'} />
        )
    }

    return (
        <div className="space-y-3.5">
            {/* Branch Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold uppercase text-center underline flex-1">{branchData.name}</h1>
                <button onClick={()=> navigate(-1)} className="btn btn-success text-white">Back</button>
            </div>
            <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Country: {getCountryName(branchData.country)}</p>
                <p className="font-medium text-lg">Total Employees: {branchData.totalEmployees}</p>
            </div>

            {/* Departments Table */}
            <Table
                headers={[{ label: "Department", center: false }, { label: "Employees", center: false }]}
                data={branchData?.departments || []}
                renderRow={(dept, idx, tdStyling) => (
                    <>
                        <td className={tdStyling}>{dept.name}</td>
                        <td className={tdStyling}>{dept.employees}</td>
                    </>
                )}
                emptyMessage="No departments found for this branch."
                idKey="id"
            />
        </div>
    )
}

export default Branch
