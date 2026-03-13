import { toast } from "react-toastify"
import ReactFlagsSelect from "react-flags-select"
import { getCountryName } from "../../../Utils/CountryName"
import { Link } from "react-router-dom"

const EmploymentDetails = ({ labelStyling, inputStyling, select, setStep, requiredInputLabel, data, setData, accountType, countries, branches, departments, users, roles }) =>
{
    //Creating a safe countries array for fallback
    const safeCountries = Array.isArray(countries) ? countries : []

    // Filtering branches based on selected country
    const safeBranches = Array.isArray(branches) ? branches : []
    const filteredBranches = safeBranches.filter(b => b.country === data?.employmentDetails?.country)
    
    // Filtering departments based on selected branch
    const selectedBranchName = safeBranches.find(b => b.id === Number(data?.employmentDetails?.branch))?.name
    const safeDepartments = Array.isArray(departments) ? departments : []
    const filteredDepartments = safeDepartments.filter(d => d.branch === selectedBranchName)

    //Filtering the role based on account type
    const safeRoles = Array.isArray(roles) ? roles : []
    const filteredRoles = safeRoles.filter(r => r.type === accountType)

    //Checking if the form is valid before proceeding
    const isFormValid = () =>
    {
        if (accountType === "Admin") {
            return data.employmentDetails.country && data.employmentDetails.branch && data.employmentDetails.department && data.employmentDetails.role && data.employmentDetails.startDate
        } 
        else 
            {
            return data.employmentDetails.country && data.employmentDetails.branch && data.employmentDetails.department && data.employmentDetails.role && data.employmentDetails.startDate && data.employmentDetails.hod && data.employmentDetails.gm && data.employmentDetails.hr
        }
    }

    const handleNext = () =>
    {
        if (!isFormValid()) 
        {
            toast.error("Please fill all required fields before proceeding.")
            return
        }

        if (accountType === "Admin") 
        {
            setStep(4)
        } else {
            setStep(4)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Country{requiredInputLabel()}</label>
                    {
                        !safeCountries || safeCountries.length === 0
                        ?
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                No countries available.{" "}
                                <Link to="/dashboard/settings/countries" className="text-blue-600 underline hover:text-blue-800">Click here to add a country</Link>.
                            </div>
                        :
                            <ReactFlagsSelect selected={data?.employmentDetails.country} onSelect={code => {setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, country: code, branch: "", department: ""}}))}} countries={safeCountries.map(country => country.name)} selectButtonClassName="select select-bordered select-neutral w-full bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"/>
                    }
                </div>
                <div className={`mt-2 space-y-2 ${!data?.employmentDetails.country ? "hidden" : "block"}`}>
                    <label className={labelStyling}>Branch{requiredInputLabel()}</label>
                    {
                        filteredBranches?.length === 0 
                        ? 
                        
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                No branches available for {getCountryName(data?.employmentDetails.country)}.{" "}
                                <Link to="/dashboard/settings/branches" className="text-blue-600 underline hover:text-blue-800">Click here to add a branch</Link>.
                            </div>
                        : 
                            <select className={select} value={data.employmentDetails.branch} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, branch: e.target.value, department: ""}}))}>
                                <option value="">Select branch</option>
                                    {
                                        filteredBranches?.map((branch) => (
                                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                                        ))
                                    }
                            </select>
                    }
                </div>
                <div className={`mt-2 space-y-2 ${!data?.employmentDetails?.branch ? "hidden" : "block"}`}>
                    <label className={labelStyling}>Department{requiredInputLabel()}</label>
                    {
                        filteredDepartments?.length === 0 
                        ? 
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                No departments available for branch {selectedBranchName}.{" "}
                                <Link to="/dashboard/settings/departments" className="text-blue-600 underline hover:text-blue-800">Click here to add a department</Link>.
                            </div>
                        : 
                            <select className={select} value={data.employmentDetails.department} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, department: e.target.value}}))}>
                                <option value="">Select department</option>
                                    {
                                        filteredDepartments?.map((department) => (
                                            <option key={department.id} value={department.id}>{department.name}</option>
                                        ))
                                    }
                            </select>
                    }
                </div>

                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Role{requiredInputLabel()}</label>
                    {
                        filteredRoles?.length === 0 
                        ? 
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                No roles added for account type {accountType.toLowerCase()}.{" "}
                                <Link to="/dashboard/settings/roles" className="text-blue-600 underline hover:text-blue-800">Click here to add a 
                                new role</Link>.
                            </div>
                        : 
                            <select className={select} value={data.employmentDetails.role} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, role: e.target.value}}))}>
                                <option value="">Select role</option>
                                    {
                                        filteredRoles?.map((role) => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))
                                    }
                            </select>
                    }
                </div>

                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Start Date{requiredInputLabel()}</label>
                    <input type="date" className={inputStyling} value={data.employmentDetails.startDate} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, startDate: e.target.value}}))} />
                </div>

                {
                    accountType !== "Admin" && 
                    (
                        <>
                            <div className="mt-2 space-y-2">
                                <label className={labelStyling}>Direct Control (HOD){requiredInputLabel()}</label>
                                {
                                    !users || users.length === 0
                                    ?
                                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                            No users available to assign as HOD.{" "}
                                            <Link to="/dashboard/users" className="text-blue-600 underline hover:text-blue-800">Click here to add users</Link>.
                                        </div>
                                    :
                                        <select className={select} value={data.employmentDetails.hod} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, hod: e.target.value}}))}>
                                            <option value="">Select HOD</option>
                                            {
                                                users?.map(h => <option key={h.id} value={h.id}>{h.firstName} {h.lastName}</option>)
                                            }
                                        </select>
                                }
                            </div>

                            <div className="mt-2 space-y-2">
                                <label className={labelStyling}>General Manager (GM){requiredInputLabel()}</label>
                                {
                                    !users || users.length === 0
                                    ?
                                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                            No users available to assign as General Manager.{" "}
                                            <Link to="/dashboard/users" className="text-blue-600 underline hover:text-blue-800">Click here to add users</Link>.
                                        </div>
                                    :
                                        <select className={select} value={data.employmentDetails.gm} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, gm: e.target.value}}))}>
                                            <option value="">Select General Manager</option>
                                            {
                                                users?.map(gm => <option key={gm.id} value={gm.id}>{gm.firstName} {gm.lastName}</option>)
                                            }
                                        </select>
                                }
                            </div>
                            <div className="mt-2 space-y-2">
                                <label className={labelStyling}>Human Resource Manager{requiredInputLabel()}</label>
                                {
                                    !users || users.length === 0
                                    ?
                                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                            No users available to assign as Human Resource Manager.{" "}
                                            <Link to="/dashboard/users" className="text-blue-600 underline hover:text-blue-800">Click here to add users</Link>.
                                        </div>
                                    :
                                        <select className={select} value={data.employmentDetails.hr} onChange={(e) => setData(prev => ({...prev, employmentDetails: { ...prev.employmentDetails, hr: e.target.value}}))}>
                                            <option value="">Select Human Resource Manager</option>
                                            {
                                                users?.map(hr => <option key={hr.id} value={hr.id}>{hr.firstName} {hr.lastName}</option>)
                                            }
                                        </select>
                                }
                            </div>
                        </>
                    )
                }
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-5">
                <button className='btn btn-neutral' onClick={() => setStep(2)}>Back</button>
                <button className={`btn btn-success text-white ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleNext}>Next</button>
            </div>
        </>
    )
}

export default EmploymentDetails
