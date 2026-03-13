import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import EmployeeDetails from "./Steps/EmployeeDetails"
import EmployeeEducation from "./Steps/EmployeeQualifications"
import EmploymentDetails from "./Steps/EmploymentDetails"
import PayrollDetails from "./Steps/PayrollDetails"
import Uploads from "./Steps/Uploads"
import Summary from "./Steps/Summary"
import AccountType from "./Steps/AccountType"

const NewEmployee = ({ country }) => 
{
    const navigate = useNavigate()

    //Loading state
    const [loading, setLoading] = useState(false)

    //States to store the countries, branches, roles, departments, HODs, GMs, and HRs
    const [roles, setRoles] = useState([])
    const [countries, setCountries] = useState([])
    const [branches, setBranches] = useState([])
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])

    //Stepper states
    const [step, setStep] = useState(1)
    const [steps, setSteps] = useState([])

    //State to store the new employee data
    const [employeeData, setEmployeeData] = useState(
    {
        // Employee Info
        accountType: "",
        surname: "",
        firstName: "",
        lastName: "",
        email: "",
        idNo: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        phoneNumber: "",

        // Qualifications
        qualifications: [],

        // Employment Details
        employmentDetails: {
            country: "",
            branch: "",
            department: "",
            role: "",
            employmentType: "",
            startDate: "",
            workstation: "",
            hod: "",
            gm: "",
            hr: ""
        },

        // Payroll/Bank Details
        bankDetails: {
            bankName: "",
            accountNumber: "",
            kra: "",
            nssf: "",
            nhif: ""
        },

        // Uploaded Files
        uploads: {
            cv: null,
            terms: null,
            bankStatement: null,
            kra: null,
            nssf: null,
            nhif: null,
            educationFiles: [],
            others: []
        }
    })

    //Fetching the users in the selected country once the country changes
    useEffect(() => 
    {
        if (country)
        {
            const fetchUsersByCountry = async () => 
            {
                try 
                {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users?country=${country}`)
                    const data = await response.json()
                    setUsers(data)
                } 
                catch (error) 
                {
                    toast.error(`Failed to fetch users: ${error.message}`)
                }
            }

            fetchUsersByCountry()
        }
    }, [country])

    //Function to fetch the countries, branches, roles, departments, HODs, GMs, and HRs from the backend
    const fetchInitialData = async () => 
    {
        //Fetch logic here
        try 
        {
            const rolesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/roles`)
            const countriesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/countries`)
            const branchesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/branches`)
            const departmentsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/departments`)

            const countriesData = await countriesResponse.json()
            setCountries(countriesData)

            const branchesData = await branchesResponse.json()
            setBranches(branchesData)

            const departmentsData = await departmentsResponse.json()
            setDepartments(departmentsData)
            const rolesData = await rolesResponse.json()
            setRoles(rolesData)
        } 
        catch (error) 
        {
            toast.error(`Failed to fetch roles: ${error.message}`)
        }
    }

    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true
            fetchInitialData()
        }
    }, [])

    useEffect(() => {
        const baseSteps = ["Account Type", "Employee Info", "Employment Details"]
        if (employeeData.accountType === "Admin") {
            setSteps([...baseSteps, "Review & Submit"])
        } else if (employeeData.accountType === "Employee") {
            setSteps([...baseSteps, "Employee Qualifications", "Payroll Details", "Uploads", "Review & Submit"])
        } else {
            // Before selection, show base steps
            setSteps(baseSteps)
        }
    }, [employeeData.accountType])

    //Stylings
    const select = "select select-bordered select-neutral w-full bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
    const inputStyling = "input input-neutral input-bordered w-full bg-inherit focus:outline-none focus:ring-2 focus:ring-sky-400"
    const labelStyling = "text-sm font-medium text-gray-700"
    const containerStyling = "mt-1 space-y-"
    const requiredInputLabel = () => <sup className="text-red-600 text-base">*</sup>

    //Function to create the new employee
    const createEmployeeAccount = async e =>
    {
        e.preventDefault()
        console.log(employeeData)
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData)
        })

        if (!response.ok)
        {
            const errorData = await response.json()
            console.log(errorData)
            toast.error(errorData.message || "Failed to create employee account")
            setLoading(false)
            return
        }

        //Getting the successful response data
        const newUser = await response.json()
        toast.success(`${employeeData?.firstName} ${employeeData?.lastName}'s account created successfully`)
        setUsers(prevUsers => [...prevUsers, newUser])
        setLoading(false)
        navigate(-1)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl">New Employee</h1>
                <button onClick={() => navigate(-1)} className="btn btn-success text-white">Cancel</button>
            </div>

            {/* Stepper */}
            <ul className="steps steps-vertical md:steps-horizontal w-full">
                {steps.map((stepLabel, index) => (
                    <li key={index} className={`step ${step > index ? "step-info" : ""}`}>{stepLabel}</li>
                ))}
            </ul>

            {/* Step Content */}
            <div className="lg:px-2">
                <div className="p-3 bg-white rounded-lg shadow-md">
                    {
                        step ===1 && <AccountType select={select} data={employeeData} setData={setEmployeeData} requiredInputLabel={requiredInputLabel} labelStyling={labelStyling} containerStyling={containerStyling} setStep={setStep}/>
                    }
                    {
                        step === 2 && <EmployeeDetails select={select} containerStyling={containerStyling} inputStyling={inputStyling} labelStyling={labelStyling} setStep={setStep} requiredInputLabel={requiredInputLabel} country={country} data={employeeData} setData={setEmployeeData} accountType={employeeData.accountType} />
                    }
                    {
                        step === 3 && <EmploymentDetails select={select} inputStyling={inputStyling} labelStyling={labelStyling} setStep={setStep} requiredInputLabel={requiredInputLabel} data={employeeData} setData={setEmployeeData} accountType={employeeData.accountType} countries={countries} branches={branches} departments={departments} roles={roles} users={users}/>
                    }
                    {
                        employeeData.accountType !== "Admin" && step === 4 && <EmployeeEducation select={select} inputStyling={inputStyling} labelStyling={labelStyling} setStep={setStep} requiredInputLabel={requiredInputLabel} data={employeeData} setData={setEmployeeData} />
                    }
                    {
                        employeeData.accountType !== "Admin" && step === 5 && <PayrollDetails select={select} inputStyling={inputStyling} labelStyling={labelStyling} setStep={setStep}  requiredInputLabel={requiredInputLabel} data={employeeData} setData={setEmployeeData}/>
                    }
                    {
                        employeeData.accountType !== "Admin" && step === 6 && <Uploads select={select} inputStyling={inputStyling} labelStyling={labelStyling} setStep={setStep} requiredInputLabel={requiredInputLabel} data={employeeData} setData={setEmployeeData} />
                    }
                    {
                        ((employeeData.accountType === "Admin" && step === 4) || (employeeData.accountType !== "Admin" && step === 7)) && <Summary data={employeeData} setStep={setStep} createEmployeeAccount={createEmployeeAccount} accountType={employeeData.accountType} loading={loading} users={users} branches={branches} departments={departments} roles={roles}/>
                    }
                </div>
            </div>
        </>
    )
}

export default NewEmployee