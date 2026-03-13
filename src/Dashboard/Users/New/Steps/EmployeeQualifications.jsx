/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import Table from "../../../Components/Table"

const EmployeeEducation = ({ labelStyling, inputStyling, select, setStep, requiredInputLabel, data, setData }) => 
{
    const educationLevels = [
        { value: "High School" },
        { value: "Diploma" },
        { value: "Bachelor's Degree" },
        { value: "Master's Degree" },
        { value: "PhD" },
        { value: "Other" }
    ]

    // Local state for form inputs
    const [level, setLevel] = useState("")
    const [field, setField] = useState("")
    const [institution, setInstitution] = useState("")
    const [year, setYear] = useState("")

    // Use parent's qualifications array
    const [qualifications, setQualifications] = useState(data.qualifications || [])

    // Sync local qualifications with parent state
    useEffect(() => setData(prev => ({ ...prev, qualifications })), [qualifications])

    // Add new qualification
    const addQualification = () => 
    {
        if (!level || !field || !institution || !year)
        {
            toast.error("Please fill in all the required fields")
            return
        }
        setQualifications([...qualifications, { highestLevel: level, field, institution, graduationYear: year }])
        setLevel("")
        setField("")
        setInstitution("")
        setYear("")
    }

    // Delete qualification
    const deleteQualification = index => setQualifications(qualifications.filter((_, i) => i !== index))

    // Table headers
    const headers = [
        { label: "Education Level" },
        { label: "Field of Study" },
        { label: "Institution" },
        { label: "Graduation Year" },
        { label: "Action", center: true }
    ]

    // Table renderRow function
    const renderRow = (q, idx, td) => (
        <>
            <td className={td}>{q.highestLevel}</td>
            <td className={td}>{q.field}</td>
            <td className={td}>{q.institution}</td>
            <td className={td}>{q.graduationYear}</td>
            <td className={`${td} flex justify-center items-center`}>
                <button className="btn btn-sm btn-error text-white" onClick={() => deleteQualification(idx)}>Delete</button>
            </td>
        </>
    )

    const isFormValid = () => 
    {
        if (qualifications.length === 0) return false
        return true
    }

    const handleNext = () => 
    {
        if (!isFormValid()) 
        {
            toast.error("Please fill all required fields before proceeding.")
            return
        }
        setStep(5)
    }

    return (
        <div className="space-y-2">
            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Highest Education Level{requiredInputLabel()}</label>
                    <select className={select} value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="">Select education level</option>
                        {educationLevels.map(l => <option key={l.value} value={l.value}>{l.value}</option>)}
                    </select>
                </div>
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Field of Study{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g Computer Science" value={field} onChange={(e) => setField(e.target.value)} />
                </div>
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Institution{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g University of Nairobi" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                </div>
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Graduation Year{requiredInputLabel()}</label>
                    <input type="number" min="1900" max="9999" className={inputStyling} placeholder="E.g 2020" value={year} onChange={e => 
                    {
                        const val = e.target.value
                        if (val.length <= 4) setYear(val)
                    }} />
                </div>
            </div>

            {/* Add Qualification Button */}
            <div className="flex justify-end">
                <button className="btn btn-primary text-white" onClick={addQualification}>Add Qualification</button>
            </div>

            {/* Table of Entered Qualifications */}
            {
                qualifications?.length > 0 && <Table headers={headers} data={qualifications} emptyMessage="No qualifications added yet." renderRow={renderRow}/>
            }
            

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-1">
                <button className='btn btn-neutral' onClick={() => setStep(2)}>Back</button>
                <button className={`btn btn-success text-white ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default EmployeeEducation
