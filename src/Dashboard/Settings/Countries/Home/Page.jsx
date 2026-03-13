import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { countries as countryData } from "countries-list"

import AddCountryModal from "../New/Add"
import Table from "../../../Components/Table"

const Countries = () => 
{
    const navigate = useNavigate()
    const [countries, setCountries] = useState([])
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    //Fetching the country from the backend
    useEffect(() =>
    {
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
                toast.error(`Error fetching countries: ${error}`)
            }
            finally
            {
                setLoading(false)
            }
        }

        fetchCountries()
    },[])

    //Function to add the country to the list of countries
    const handleAddCountry = (savedCountry) =>
    {
        const newFormatted = {
            id: savedCountry.id,
            name: savedCountry.name,
            counts: {
                branches: 0,
                departments: 0,
                employees: 0
            }
        }

        setCountries(prev => [...prev, newFormatted])
    }

    // Helper to get short/common name from country code
    const getCountryName = code => countryData[code]?.name || code
    
    const tdStyling = "border border-gray-200 p-3"

    //Table headers configuration
    const headers = [
        { label: "Country" },
        { label: "Branches" },
        { label: "Departments" },
        { label: "Employees" },
        { label: "Action", center: true }
    ]

    //Table row configuration
    const renderRows = country => (
        <>
            <td className={tdStyling}>{getCountryName(country?.name)}</td>
            <td className={tdStyling}>{country?.counts?.branches || 0}</td>
            <td className={tdStyling}>{country?.counts?.departments || 0}</td>
            <td className={tdStyling}>{country?.counts?.employees || 0}</td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/settings/countries/${country?.id}`)}>View</button>
            </td>
        </>
    )

    return (
        <>
            {/* Header with Add button */}
            <div className="flex justify-end items-center mb-4">
                <button className="btn btn-success text-white" onClick={() => setAddModalOpen(true)}>Add Country</button>
            </div>

            {/* Countries Table */}
            <Table headers={headers} renderRow={renderRows} data={countries} emptyMessage={"No countries found. Click Add Country to get started."} loading={loading}/>
            
            <AddCountryModal addModalOpen={addModalOpen} closeAddModal={() => setAddModalOpen(false)} onCountryAdded={handleAddCountry} />
        </>
    )
}

export default Countries