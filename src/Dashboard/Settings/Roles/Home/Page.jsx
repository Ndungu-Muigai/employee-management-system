import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import AddRoleModal from "../New/Page"
import Table from "../../../Components/Table"

const Roles = ({ permissionsList, roleTypes }) => 
{
    const navigate = useNavigate()

    const [roles, setRoles] = useState([])
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    //Fetching the roles from the backend would typically be done here.
    const fetchRoles = async () =>
    {
        try 
        {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/roles`)
            const data = await response.json()
            if (!Array.isArray(data)) 
            {
                setRoles([])
                return
            }
            setRoles(data)
        } 
        catch (error) 
        {
            toast.error(`Failed to fetch roles: ${error.message}`)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(() => 
    {
        fetchRoles()
    }, [])

    const handleAddRole = newRole => 
    {
        const roleWithDate = {
            ...newRole,
            createdAt: new Date().toISOString()
        }

        setRoles([...roles, roleWithDate])
    }

    const tdStyling = "border border-gray-200 p-3"

    //Table headers configuration
    const headers = [
        { label: "Role" },
        { label: "Role Type" },
        // { label: "Permissions count" },
        { label: "Created on" },
        { label: "Action", center: true }
    ]

    const renderRolesRow = (role, td) =>(
        <>
            <td className={td}>{role.name}</td>
            <td className={td}>{role.type}</td>
            {/* <td className={td}>{role.permissions.length}</td> */}
            <td className={td}>{new Date(role.createdAt).toLocaleDateString()}</td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/settings/roles/${role.id}`)}>View</button>
            </td>
        </>
    )

    return (
        <>
            {/* Header */}
            <div className="flex justify-end items-center mb-4">
                <button className="btn btn-success text-white" onClick={() => setAddModalOpen(true)}>Add Role</button>
            </div>

            {/* Roles Table */}
            <Table headers={headers} data={roles} emptyMessage={"No roles found. Click Add Role to get started."} renderRow={renderRolesRow} loading={loading}/>

            {/* Modal */}
            <AddRoleModal addModalOpen={addModalOpen} closeAddModal={() => setAddModalOpen(false)} addRole={handleAddRole} permissionsList={permissionsList} roleTypes={roleTypes}/>
        </>
    )
}

export default Roles