import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { countries as countryData } from "countries-list"
import { toast } from "react-toastify"
import ErrorCard from "../../../../Error Page/Page"
import Loader from "../../../Components/Loader"
import Table from "../../../Components/Table"

const CountryDetails = () => 
{
    const { id } = useParams()
    const navigate = useNavigate()

    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => 
    {
        const fetchCountry = async () => 
        {
            try 
            {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/countries/${id}`)
                const data = await res.json()
                setCountry(data)
            } 
            catch (err) 
            {
                toast.error("Failed to fetch country:", err)
            } 
            finally 
            {
                setLoading(false)
            }
        }

        fetchCountry()
    }, [id])

    if (loading) 
    {
        return (
            <div className="flex items-center justify-center w-full h-40">
                <Loader message={"Loading country details..."} />
            </div>
        )
    }

    if (!country) 
    {
        return (
            <ErrorCard message={"Country not found."} backLink={'/dashboard/settings/countries'} backLabel={'Back to countries'} />
        )
    }

    if (!country) 
    {
        return (
            <ErrorCard message={"Country not found."} backLink={'/dashboard/settings/countries'} backLabel={'Back to countries'} />
        )
    }

    if (!country?.name) 
    {
        return (
            <ErrorCard message={"Country data is invalid."} backLink={'/dashboard/settings/countries'} backLabel={'Back to countries'} />
        )
    }

    // Get country's display name from countries-list (e.g., KE → Kenya)
    const displayCountryName = countryData[country.name]?.name || country.name

    // Flatten all departments inside all branches
    const allDepartments = country.branches.flatMap(branch => branch.departments)

    // Total employees = sum of employeeCount in all departments
    const totalEmployees = allDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0)


    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center">
                <h1 className="flex-1 text-2xl font-bold uppercase text-center underline">{displayCountryName}</h1>
                <button onClick={() => navigate(-1)} className="btn btn-success text-white ml-auto">Back</button>
            </div>

            <p className="font-medium text-xl">Total Employees: {totalEmployees}</p>

            {/* Branches Table */}
            <Table
                headers={[{ label: "Branch", center: false }, { label: "Employees", center: false }]}
                data={country.branches}
                renderRow={(branch, idx, tdStyling) => (
                    <>
                        <td className={tdStyling}>{branch.name}</td>
                        <td className={tdStyling}>{branch.employeeCount}</td>
                    </>
                )}
                emptyMessage={
                    <div>
                        No branches created. Go to the <Link to="/dashboard/settings/branches" className="link link-info">Branches page</Link> to get started.
                    </div>
                }
                idKey="id"
            />

            {/* Departments Table */}
            <Table
                headers={[{ label: "Department", center: false }, { label: "Employees", center: false }]}
                data={allDepartments}
                renderRow={(dept, idx, tdStyling) => (
                    <>
                        <td className={tdStyling}>{dept.name}</td>
                        <td className={tdStyling}>{dept.employeeCount}</td>
                    </>
                )}
                emptyMessage={
                    <div>
                        No departments created. Go to the <Link to="/dashboard/settings/departments" className="link link-info">Departments page</Link> to get started.
                    </div>
                }
                idKey="id"
            />
        </div>
    )
}

export default CountryDetails