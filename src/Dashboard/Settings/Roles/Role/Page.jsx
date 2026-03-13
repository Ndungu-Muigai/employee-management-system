import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import EditRoleModal from "./Edit"
import { toast } from "react-toastify"
import ErrorCard from "../../../../Error Page/Page"
import Loader from "../../../Components/Loader"
import Table from "../../../Components/Table"
const Role = ({ permissionsList, roleTypes }) => 
{
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    //Fetching the role details from the backend 
    const fetchRole = async roleId =>
    {
        try
        {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/roles/${roleId}`)
            const data = await response.json()
            setRole(data)
        }
        catch (error)
        {
            toast.error("Error fetching role:", error)
        }
        finally
        {
            setLoading(false)
        }
    }

    const [role, setRole] = useState({})

    useEffect(() => 
    {
        const loadRole = async () => 
        {
            await fetchRole(id)
        }

        loadRole()

    }, [id])

    const [editModalOpen, setEditModalOpen] = useState(false)

    return (
        <div className="space-y-4">
            {
                loading 
                ? 
                    <div className="flex items-center justify-center w-full h-40">
                        <Loader message={"Loading role details..."} />
                    </div>
                : 
                    !loading && !role?.name &&
                        <ErrorCard message={"Role not found."} backLink={'/dashboard/settings/roles'} backLabel={'Back to roles'} />
            }
            {
                role?.name && 
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold uppercase underline flex-1 text-center">{role.name}</h1>
                            <div className="flex gap-2">
                                <button onClick={() => navigate(-1)} className="btn btn-success text-white">Back</button>
                                <button onClick={() => setEditModalOpen(true)} className="btn btn-warning text-white">Edit</button>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-lg">Total Permissions: {role?.permissions?.length}</p>
                            <p className="font-medium text-lg">Role type: {role.type}</p>
                            <p className="font-medium text-lg">Created On: {role.createdAt}</p>
                        </div>

                        {/* Permissions Table */}
                        <Table
                            headers={[{ label: "Permissions", center: false }]}
                            data={role?.permissions || []}
                            renderRow={(perm, idx, tdStyling) => (
                                <td key={idx} className={tdStyling}>{perm}</td>
                            )}
                            emptyMessage="No permissions found for this role."
                            idKey="index"
                        />

                        {
                            editModalOpen && <EditRoleModal role={role} permissionsList={permissionsList} closeModal={() => setEditModalOpen(false)} saveRole={updatedRole => setRole(updatedRole)} roleTypes={roleTypes} refreshRoles={fetchRole}/>
                        }
                    </>
            }            
        </div>
    )
}

export default Role