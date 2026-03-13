import { useState } from "react"
import { FaSpinner, FaX } from "react-icons/fa6"
import { toast } from "react-toastify"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const EditRoleModal = ({ role, permissionsList, roleTypes, closeModal, refreshRoles }) => 
{
    const [updatedName, setUpdatedName] = useState(role.name)
    const [updatedType, setUpdatedType] = useState(role.type)
    const [updatedPermissions, setUpdatedPermissions] = useState([...role.permissions])
    const [loading, setLoading] = useState(false)

    const handlePermissionChange = perm => setUpdatedPermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm])

    const handleSave = async (e) => 
    {
        e.preventDefault()

        if (updatedPermissions.length === 0)
            return toast.error("The role must have at least one permission")

        setLoading(true)

        try 
        {
            const res = await fetch(`${BACKEND_URL}/roles/${role.id}`, 
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                {
                    name: updatedName,
                    type: updatedType,
                    permissions: updatedPermissions
                })
            })
            
            if (!res.ok) throw new Error("Failed to update role")

            toast.success("Role updated successfully")
            refreshRoles(role.id)  
            closeModal()

        } 
        catch (error) 
        {
            console.error(error)
            toast.error("Error updating role")
        }

        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Role</h2>
                    <button onClick={closeModal}>
                        <FaX className="hover:text-red-500" size={18} title="Close" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                    {/* Role Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">Role Name</label>
                        <input type="text" required value={updatedName} onChange={e => setUpdatedName(e.target.value)} className="input input-neutral bg-inherit w-full"/>
                    </div>

                    {/* Role type */}
                    <div>
                        <label className="block text-gray-700 mb-1">Role type</label>
                        <select required className="select select-neutral bg-white w-full" value={updatedType}  onChange={e => setUpdatedType(e.target.value)} >
                            {roleTypes?.map(type => (
                                <option key={type.title} value={type.value}>
                                    {type.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Permissions */}
                    <div>
                        <label className="block text-gray-700 mb-1">Permissions</label>
                        <div className="border rounded-md p-3 max-h-[35vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 bg-inherit">
                            {permissionsList.map((perm, index) => (
                                <label key={index} className="flex items-center gap-2">
                                    <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={updatedPermissions.includes(perm)} onChange={() => handlePermissionChange(perm)}/>
                                    <span>{perm}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between gap-2 mt-4">
                        <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>

                        <button type="submit" className={`btn btn-success text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                            {
                                loading 
                                ? 
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Updating...
                                    </>
                                : 
                                    "Update Role"
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditRoleModal