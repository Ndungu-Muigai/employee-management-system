import { useState } from "react"
import ReactFlagsSelect from "react-flags-select"
import { FaX, FaSpinner } from "react-icons/fa6"
import { toast } from "react-toastify"

const AddCountryModal = ({ addModalOpen, closeAddModal, onCountryAdded }) => 
{
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [loading, setLoading] = useState(false)

    //Function to handle closing of the modal and form reset
    const handleClose = () => 
    {
        setSelectedCountry(null)
        closeAddModal()
    }

    const handleSubmit = async (e) => 
    {
        e.preventDefault()
        if (!selectedCountry) return

        setLoading(true)

        try 
        {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/countries`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: selectedCountry,
                }),
            })

            if (!res.ok) 
            {
                const errorData = await res.json()
                throw new Error(errorData.error || "Failed to create country")
            }

            const savedCountry = await res.json()

            // Send the full saved country back to the parent
            onCountryAdded(savedCountry)

            toast.success("Country added successfully!")
            setSelectedCountry(null)
            closeAddModal()
        } 
        catch (err) 
        {
            console.error(err)
            toast.error(`Could not add country: ${err.message}`)
        } 
        finally 
        {
            setLoading(false)
        }
    }

    if (!addModalOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Country</h2>
                    <button onClick={handleClose}>
                        <FaX className="hover:text-red-500" size={18} title="Close"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Country</label>
                        <ReactFlagsSelect selected={selectedCountry} onSelect={(code) => setSelectedCountry(code)} searchable/>
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
                                    "Add Country"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCountryModal