const AccountType = ({ containerStyling, labelStyling, select, setStep, data, setData, requiredInputLabel}) =>
{
    const handleChange = (field, value) => setData(prev => ({ ...prev, [field]: value }))

    return(
        <div className="space-y-3">
            <div className={containerStyling}>
                <label className={labelStyling}>Select account type{requiredInputLabel()}</label>
                <select className={select} value={data.accountType} onChange={e => handleChange("accountType", e.target.value)}>
                    <option value="">Select account type</option>
                    <option value={"Employee"}>Employee</option>
                    <option value={"Admin"}>Admin</option>
                </select>
            </div>
            <div className="flex justify-center items-center">
                <button className={`btn text-white ${data?.accountType === "" ? "opacity-50 cursor-not-allowed" : "btn-success"}`} onClick={()=> data?.accountType !== "" && setStep(2)}>
                    {
                        data?.accountType === ""
                        ?
                            "Select account type first"
                        :
                            "Next"
                    }
                </button>
            </div>
        </div>
    )
}

export default AccountType