import { useState } from "react"
import { FaSpinner, FaX } from "react-icons/fa6"
import { toast } from "react-toastify"

const AddRoleModal = ({ addModalOpen, closeAddModal, addRole, permissionsList, roleTypes }) => 
{
    const [roleName, setRoleName] = useState("")
    const [selectedPermissions, setSelectedPermissions] = useState([])
    const [type, setType] = useState("")
    const [loading, setLoading] = useState(false)

    //Function to handle modal closure and reset the form
    const handleClose = () =>
    {
        setRoleName("")
        setType("")
        setSelectedPermissions([])
        closeAddModal()
    }

    const handlePermissionChange = perm => setSelectedPermissions(prev =>  prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm])

    const handleSubmit = async e => 
    {
        e.preventDefault()
        if (!roleName.trim()) return

        const newRole = 
        {
            name: roleName,
            permissions: selectedPermissions,
            type: type
        }

        try
        {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/roles`,
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRole)
            })

            if (!response.ok) throw new Error("Failed to add role")

            const data = await response.json()
            toast.success("Role added successfully")
            addRole(data)

            //C;learing the form
            setRoleName("")
            setType("")
            setSelectedPermissions([])
            closeAddModal()
        }
        catch (error)
        {
            toast.error("Error adding role:", error)
        }
        finally
        {
            setLoading(false)
        }
    }

    if (!addModalOpen) return null

    //Common styling
    const labelStyling = "block text-gray-700 mb-1"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Role</h2>
                    <button onClick={handleClose}>
                        <FaX className="hover:text-red-500" size={18} title="Close" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Role Name */}
                    <div>
                        <label className={labelStyling}>Role Name</label>
                        <input type="text" value={roleName} onChange={e => setRoleName(e.target.value)} className="input input-neutral bg-inherit w-full" placeholder="Enter role name" required />
                    </div>

                    {/* Role type */}
                    <div>
                        <label className={labelStyling}>Role type</label>
                        <select name="type" value={type} onChange={e => setType(e.target.value)} className="select select-neutral bg-white w-full">
                            <option value="">Select role type</option>
                            {
                                roleTypes?.map(type =>
                                {
                                    return(
                                        <option key={type.title} value={type.value}>{type.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* Permissions */}
                    <div>
                        <label className={labelStyling}>Permissions <span className="text-sm text-gray-500">(You can select more than one)</span></label>
                        <div className="border rounded-md p-3 max-h-[40vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 bg-inherit">
                            {
                                permissionsList.map((perm, index) => 
                                {
                                    return(
                                        <label key={index} className="flex items-center gap-2">
                                            <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={selectedPermissions.includes(perm)} onChange={() => handlePermissionChange(perm)} />
                                            <span>{perm}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Actions */}
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
                                    "Save Role"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRoleModal