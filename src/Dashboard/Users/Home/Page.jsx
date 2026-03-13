/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCountryName } from "../../Utils/CountryName"

import Table from "../../Components/Table"
import { toast } from "react-toastify"

const Users = () => 
{
    const navigate = useNavigate()

    //Loading state
    const [loading, setLoading] = useState(false)
    const [loadingCountries, setLoadingCountries] = useState(false)
    const [loadingBranches, setLoadingBranches] = useState(false)
    const [loadingDepartments, setLoadingDepartments] = useState(false)
    const [loadingRoles, setLoadingRoles] = useState(false)

    //Filter states
    const [selectedCountry, setSelectedCountry] = useState("All")
    const [selectedBranch, setSelectedBranch] = useState("All")
    const [selectedDepartment, setSelectedDepartment] = useState("All")
    const [selectedRole, setSelectedRole] = useState("All")
    const [searchName, setSearchName] = useState("")

    // Data states
    const [users, setUsers] = useState([])
    const [countries, setCountries] = useState([])
    const [branches, setBranches] = useState([])
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])

    //Fetching the users from the backend
    // const fetchUsers = async () =>
    // {
    //     try
    //     {
    //         setLoading(true)
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`)
    //         const users = await response.json()
    //         if (!Array.isArray(users)) 
    //         {
    //             setUsers([])
    //             return
    //         }
    //         setUsers(users)
    //     }
    //     catch (error)
    //     {
    //         toast.error(`Failed to fetch users: ${error.message}`)
    //     }
    //     finally
    //     {
    //         setLoading(false)
    //     }
    // }

    //Fetching the configured countries, branches, departments, and roles 
    // const fetchCountries = async () =>
    // {
    //     try
    //     {
    //         setLoadingCountries(true)
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/countries`)
    //         const countries = await response.json()
    //         if (!Array.isArray(countries)) 
    //         {
    //             setCountries([])
    //             return
    //         }
    //         setCountries(countries)
    //     }
    //     catch (error)
    //     {
    //         toast.error(`Failed to fetch countries: ${error.message}`)
    //     }
    //     finally
    //     {
    //         setLoadingCountries(false)
    //     }
    // }

    // const fetchBranches = async countryCode =>
    // {
    //     try
    //     {
    //         setLoadingBranches(true)
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/branches/country/${countryCode}`)
    //         const branches = await response.json()
    //         if (!Array.isArray(branches)) 
    //         {
    //             setCountries([])
    //             return
    //         }
    //         setBranches(branches)
    //     }
    //     catch (error)
    //     {
    //         toast.error(`Failed to fetch branches: ${error.message}`)
    //         setBranches([])
    //     }
    //     finally
    //     {
    //         setLoadingBranches(false)
    //     }
    // }

    // const fetchDepartments = async branch => 
    // {
    //     const branchID = branches.find(b => b.name === branch)?.id
    //     if (!branchID) 
    //     {
    //         setDepartments([])
    //         return
    //     }
    //     try 
    //     {
    //         setLoadingDepartments(true)
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/departments/branch/${branchID}`);
    //         const data = await response.json();
    //         if (!Array.isArray(data)) 
    //         {
    //             setDepartments([])
    //             return
    //         }
    //         setDepartments(data);
    //     } 
    //     catch (error) 
    //     {
    //         toast.error(`Failed to fetch departments: ${error.message}`);
    //         setDepartments([]);
    //     }
    //     finally
    //     {
    //         setLoadingDepartments(false)
    //     }
    // }

    // const fetchRoles = async () =>
    // {
    //     try
    //     {
    //         setLoadingRoles(true)
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/roles`)
    //         const roles = await response.json()
    //         if (!Array.isArray(roles)) 
    //         {
    //             setCountries([])
    //             return
    //         }
    //         setRoles(roles)
    //     }
    //     catch (error)
    //     {
    //         toast.error(`Failed to fetch roles: ${error.message}`)
    //         setRoles([])
    //     }
    //     finally
    //     {
    //         setLoadingRoles(false)
    //     }
    // }

    //Fetch countries on component mount
    // useEffect(() =>
    // {
    //     fetchCountries()
    //     fetchUsers()
    //     fetchRoles()
    // }, [])

    //Fetch branches and departments when selectedCountry changes
    // useEffect(() =>
    // {
    //     if (selectedCountry !== "All")
    //     {
    //         fetchBranches(selectedCountry)
    //     }
    //     else
    //     {
    //         setBranches([])
    //     }
    // }, [selectedCountry])

    //Fetch departments on selected branch change
    // useEffect(() =>
    // {
    //     if(selectedBranch !== "All" && selectedCountry !== "All")
    //     {
    //         fetchDepartments(selectedBranch)
    //     }
    //     else
    //     {
    //         setDepartments([])
    //     }
    // }, [selectedBranch])

    // Filter users
    const filteredUsers = users?.filter(emp =>
        (selectedCountry === "All" || emp.employmentDetails?.branch?.country?.name === selectedCountry) &&
        (selectedBranch === "All" || emp.employmentDetails?.branch?.name === selectedBranch) &&
        (selectedDepartment === "All" || emp.employmentDetails?.department?.name === selectedDepartment) &&
        (selectedRole === "All" || emp?.role?.name === selectedRole) &&
        (searchName === "" || `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchName.toLowerCase()))
    )

    // Generate custom no-data message
    const noUsersMessage = () => 
    {
        let message = "No users found"
        if (searchName) message += ` matching name "${searchName}"`
        if (selectedCountry !== "All") message += ` in country ${getCountryName(selectedCountry)}`
        if (selectedBranch !== "All") message += ` at branch "${selectedBranch}"`
        if (selectedDepartment !== "All") message += ` in department "${selectedDepartment}"`
        if (selectedRole !== "All") message += ` with role ${selectedRole}`
        message += ". Try adjusting your filters."
        return message
    }

    //Defining the headers to be passed down
    const headers = [
        { label: "#" },
        { label: "First Name" },
        { label: "Last Name" },
        { label: "Country" },
        { label: "Branch" },
        { label: "Department" },
        { label: "Role" },
        { label: "Action", center: true }
    ]

    //Rows to be rendered
    const renderRow = (emp, idx, tdStyling) => (
        <>
            <td className={tdStyling}>{idx + 1}</td>
            <td className={tdStyling}>{emp?.firstName}</td>
            <td className={tdStyling}>{emp?.lastName}</td>
            <td className={tdStyling}>{getCountryName(emp?.employmentDetails?.branch?.country?.name)}</td>
            <td className={tdStyling}>{emp?.employmentDetails?.branch?.name}</td>
            <td className={tdStyling}>{emp?.employmentDetails?.department?.name}</td>
            <td className={tdStyling}>{emp?.role?.name}</td>
            <td className={`${tdStyling} flex justify-center`}>
                <button className="btn btn-primary text-white" onClick={() => navigate(`/dashboard/users/${emp.id}`)}>View</button>
            </td>
        </>
    )

    //Common styling
    const selectStyling = "select select-bordered select-neutral w-full bg-white disabled:text-black disabled:bg-slate-100"

    return (
        <>
            <div className="flex justify-between items-center px-1 gap-2 md:gap-0 mb-3">
                <h1 className="hidden md:block text-2xl font-bold">User Management</h1>
                <h1 className="md:hidden text-2xl font-bold">Users</h1>
                <Link to="/dashboard/users/new" className="btn btn-success text-white">Create account</Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center gap-3 px-1 mb-3">
                <input type="text" className="input input-bordered input-neutral bg-inherit w-full" placeholder="Search by name" value={searchName} onChange={e => setSearchName(e.target.value)} />

                <select className={selectStyling} value={selectedCountry} onChange={e => 
                {
                    setSelectedCountry(e.target.value)
                    setSelectedBranch("All")
                    setSelectedDepartment("All")
                }} disabled={loadingCountries || countries.length === 0}>
                    {
                        loadingCountries
                        ?
                            <option>Loading countries...</option>
                        :
                            countries?.length === 0
                            ?
                                <option value={"All"} disabled>No countries available</option>
                            :
                                <>
                                    <option value="All">Select Country</option>
                                    {
                                        countries?.map(country => 
                                        {
                                            return(
                                                <option key={country.id} value={country.name}>{getCountryName(country.name)}</option>
                                            )
                                        })
                                    }
                                </>
                    }
                </select>

                <select className={selectStyling} value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)} disabled={loadingBranches || branches.length === 0}>
                    {
                        loadingBranches
                        ?
                            <option>Loading branches...</option>
                        :
                            branches?.length === 0
                            ?
                                <option value={"All"} disabled>
                                    {
                                        selectedCountry === "All" 
                                        ? 
                                            "Select a country first" 
                                        : 
                                            "No branches available"
                                    }
                                </option>
                            :
                                <>
                                    <option value={"All"}>Select branch</option>
                                    {
                                        branches?.map(branch => 
                                        {
                                            return(
                                                <option key={branch.id} value={branch.name}>{branch.name}</option>
                                            )
                                        })
                                    }
                                </>
                    }
                </select>

                <select className={selectStyling} value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} disabled={loadingDepartments || departments.length === 0}>
                    {
                        loadingDepartments
                        ?
                            <option>Loading departments...</option>
                        :
                            departments?.length === 0
                            ?
                                <option value={"All"} disabled>
                                    {
                                        selectedBranch === "All" 
                                        ? 
                                            "Select a branch first" 
                                        :
                                            "No departments available"
                                    }
                                </option>
                            :
                                <>
                                    <option value="All">Select Department</option>
                                    {
                                        departments?.map(dept => 
                                        {
                                            return(
                                                <option key={dept.id} value={dept.name}>{dept.name}</option>
                                            )
                                        })
                                    }
                                </>
                    }
                </select>

                <select className={selectStyling} value={selectedRole} onChange={e => setSelectedRole(e.target.value)} disabled={loadingRoles || roles.length === 0}>
                    {
                        loadingRoles
                        ?
                            <option>Loading roles...</option>
                        :
                            roles.length === 0
                            ?
                                <option value={"All"} disabled>No roles configured</option>
                            :
                                <>
                                    <option value="All">Select Role</option>
                                    {
                                        roles?.map(role => 
                                        {
                                            return(
                                                <option key={role.id} value={role.name}>{role.name}</option>
                                            )
                                        })
                                    }
                                </>
                    }
                </select>
            </div>

            <Table headers={headers} data={filteredUsers} emptyMessage={noUsersMessage()} renderRow={renderRow} loading={loading}/>
        </>
    )
}

export default Users