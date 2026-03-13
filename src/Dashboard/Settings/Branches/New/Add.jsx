import { useState } from "react"
import ReactFlagsSelect from "react-flags-select"
import { FaX, FaSpinner } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const AddBranchModal = ({ addModalOpen, closeAddModal, addBranch, countries }) => 
{
    const [branchName, setBranchName] = useState("")
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [loading, setLoading] = useState(false)

    //Funcition to handle closing of the modal and resetting the form
    const handleClose = () =>
    {
        setBranchName("")
        setSelectedCountry(null)
        closeAddModal()
    }

    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        if (!branchName || !selectedCountry) return

        setLoading(true)

        try 
        {
            // Convert selected flag code ("KE") → countryId
            const countryObj = countries.find(c => c.name === selectedCountry);
            if (!countryObj) 
            {
                throw new Error("Selected country not found")
            }

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/branches`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: branchName,
                    countryId: countryObj.id,
                }),
            })

            if (!res.ok) 
            {
                const errorData = await res.json()
                throw new Error(errorData.error || "Failed to create branch")
            }

            const savedBranch = await res.json()

            // Send the full saved branch back to the parent
            addBranch(savedBranch)

            toast.success("Branch added successfully!")
            setBranchName("")
            setSelectedCountry(null)
            closeAddModal()
        } 
        catch (err) 
        {
            console.error(err)
            toast.error(`Could not add branch: ${err.message}`)
        } 
        finally 
        {
            setLoading(false)
        }
    }

    if (!addModalOpen) return null

    //Checking if the countries exist before creating a new branch
    const isDisabled = countries?.length === 0

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Branch</h2>
                    <button onClick={handleClose}>
                        <FaX className="hover:text-red-500" size={18} title="Close" />
                    </button>
                </div>

                {
                    isDisabled 
                    ? 
                        <p className="text-sm mb-3">
                            Please <Link to={"/dashboard/settings/countries"} className="link link-info">create a country</Link> of operation before adding a branch.
                        </p>
                    :
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Branch Name</label>
                                <input type="text" value={branchName} onChange={(e) => setBranchName(e.target.value)} className="input input-neutral bg-inherit w-full" placeholder="Enter branch name" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Country</label>
                                <ReactFlagsSelect countries={countries.map(c => c.name)} selected={selectedCountry} onSelect={(code) => setSelectedCountry(code)} searchable/>
                            </div>
                            <div className="flex justify-between gap-2 mt-4">
                                <button type="button" className="btn btn-outline" onClick={handleClose}>Cancel</button>
                                <button type="submit" className={`btn btn-success text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                    {
                                        loading
                                        ?
                                            <>
                                                <FaSpinner className="animate-spin mr-2" />
                                                Adding...
                                            </>
                                        :
                                            "Add Branch"
                                    }
                                </button>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}

export default AddBranchModal