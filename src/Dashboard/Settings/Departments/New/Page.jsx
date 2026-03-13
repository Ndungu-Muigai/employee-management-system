import { useState } from "react"
import { FaX, FaSpinner } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const AddDepartmentModal = ({ addModalOpen, closeAddModal, onDepartmentAdded, branches }) => 
{
    const [departmentName, setDepartmentName] = useState("")
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [loading, setLoading] = useState(false)

    //Function to handle closing of the modal and resetting the form
    const handleClose = () =>
    {
        setDepartmentName("")
        setSelectedBranch(null)
        closeAddModal()
    }

    const handleSubmit = async e => 
    {
        e.preventDefault()
        if (!departmentName || !selectedBranch) return

        setLoading(true)

        try 
        {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/departments`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                {
                    name: departmentName,
                    branchId: selectedBranch.id,
                }),
            })

            if (!res.ok) 
            {
                const errorData = await res.json()
                throw new Error(errorData.error || "Failed to create department")
            }

            const savedDepartment = await res.json()

            // Send the full saved department back to the parent
            onDepartmentAdded(savedDepartment)

            toast.success("Department added successfully!")
            setDepartmentName("")
            setSelectedBranch(null)
            closeAddModal()
        } 
        catch (err) 
        {
            console.error(err)
            toast.error(`Could not add department: ${err.message}`)
        } 
        finally 
        {
            setLoading(false)
        }
    }

    if (!addModalOpen) return null

    const isDisabled = branches?.length === 0

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Department</h2>
                    <button onClick={handleClose}>
                        <FaX className="hover:text-red-500" size={18} title="Close" />
                    </button>
                </div>
                {
                    isDisabled 
                    ? 
                        <p className="text-sm mb-3">
                            Please{" "} 
                            <Link to={"/dashboard/settings/branches"} className="link link-info"> create a branch</Link>{" "} before adding a department.
                        </p>
                    : 
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Department Name</label>
                                <input type="text" value={departmentName}  onChange={e => setDepartmentName(e.target.value)} className="input input-neutral bg-inherit w-full" placeholder="Enter department name" required/>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Branch</label>
                                <select value={selectedBranch?.id || ""} onChange={e => setSelectedBranch(branches.find((b) => b.id.toString() === e.target.value))} className="select select-neutral bg-white w-full" required>
                                    <option value="">Select a branch</option>
                                    {
                                        branches.map((branch) => (
                                            <option key={branch.id} value={branch.id}>{branch.name}</option>
                                        ))
                                    }
                                </select>
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
                                            "Add Department"
                                    }
                                </button>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}

export default AddDepartmentModal