import { useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from 'react-toastify'

const EmployeeDetails = ({ containerStyling, labelStyling, inputStyling, select, setStep, requiredInputLabel, country, data, setData }) =>
{
    const genders = [
        { value: "Male" },
        { value: "Female" }
    ]

    const maritalStatuses = [
        { value: "Single" },
        { value: "Married" },
        { value: "Divorced" },
        { value: "Widowed" },
        { value: "Separated" },
    ]

    //State to keep track of the error in phone number
    const [phoneNumberError, setPhoneNumberError] = useState("")

    const handleChange = (field, value) => setData(prev => ({ ...prev, [field]: value }))

    //Function to handle phone number change
    const handleBusinessNumberChange = value => 
    {
        setData(prev => ({ ...prev, phoneNumber: value }))
        if (value && !isValidPhoneNumber(value)) 
        {
            setPhoneNumberError('Invalid phone number')
        } 
        else 
        {
            setPhoneNumberError('')
        }
    }

    //Destructuring the data
    const { surname, firstName, lastName, email, idNo, dob, gender, maritalStatus, phoneNumber } = data

    // Input validation
    const isFormValid = () => 
    {
        if (!surname || !firstName || !lastName || !email || !idNo || !dob || !gender || !maritalStatus || !phoneNumber)
        {
            return false
        }
        else
        {
            return true
        }
    }

    const goToNextStep = () => 
    {
        if (!surname || !firstName || !lastName || !email || !idNo || !dob || !gender || !maritalStatus || !phoneNumber)
        {
            toast.error("Please fill all required fields before proceeding")
            return
        }

        setStep(3)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={containerStyling}>
                    <label className={labelStyling}>Surname{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g John" value={data.surname} onChange={e => handleChange("surname", e.target.value)} />
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>First Name{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g John" value={data.firstName} onChange={e => handleChange("firstName", e.target.value)} />
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>Last Name{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g Doe" value={data.lastName}  onChange={e => handleChange("lastName", e.target.value)} />
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>Email Address{requiredInputLabel()}</label>
                    <label className="input input-neutral w-full bg-white validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" value={data.email} onChange={e => handleChange("email", e.target.value)} />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>National ID / Passport Number{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="12345678" value={data.idNo} onChange={e => handleChange("idNo", e.target.value)} />
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>Date of birth{requiredInputLabel()}</label>
                    <input type="date" className={inputStyling} value={data.dob} onChange={e => handleChange("dob", e.target.value)} />
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>Gender{requiredInputLabel()}</label>
                    <select className={select} value={data.gender} onChange={e => handleChange("gender", e.target.value)}>
                        <option value={""}>Select gender</option>
                        {
                            genders.map(g => 
                            {
                                return(
                                    <option key={g.value} value={g.value}>{g.value}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>Marital status{requiredInputLabel()}</label>
                    <select className={select} value={data.maritalStatus} onChange={e => handleChange("maritalStatus", e.target.value)}>
                        <option value={""}>Select marital status</option>
                        {
                            maritalStatuses.map(status => 
                            {
                                return(
                                    <option key={status.value} value={status.value}>{status.value}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={containerStyling}>
                    <label className={labelStyling}>Phone Number{requiredInputLabel()}</label>
                    <PhoneInput international defaultCountry={country} className={inputStyling} placeholder="Enter phone number" value={data.phoneNumber} onChange={handleBusinessNumberChange}/>
                    {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
                </div>
            </div>

            <div className="flex justify-between items-center mt-3">
                <button className='btn btn-neutral text-white' onClick={() => setStep(1)}>Back</button>
                <button className={`btn btn-success text-white w-full md:w-auto ${!isFormValid() || phoneNumberError ? "opacity-50 cursor-not-allowed" : ""}`} onClick={goToNextStep}>Next</button>
            </div>
        </>
    )
}

export default EmployeeDetails