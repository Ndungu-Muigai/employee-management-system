/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const PayrollDetails = ({ labelStyling, inputStyling, select, setStep, requiredInputLabel, data, setData }) => {
    // Sample data for demonstration
    const banks = ["Equity Bank", "KCB Bank", "Cooperative Bank", "Stanbic Bank", "NCBA Bank"]
    const branches = ["Nairobi Branch", "Mombasa Branch", "Kisumu Branch", "Nakuru Branch"]

    // Local state initialized from parent
    const [bank, setBank] = useState(data.payrollDetails?.bank || "")
    const [branch, setBranch] = useState(data.payrollDetails?.branch || "")
    const [accountNumber, setAccountNumber] = useState(data.payrollDetails?.accountNumber || "")
    const [kra, setKra] = useState(data.payrollDetails?.kra || "")
    const [nssf, setNssf] = useState(data.payrollDetails?.nssf || "")
    const [nhif, setNhif] = useState(data.payrollDetails?.nhif || "")

    // Sync local state with parent
    useEffect(() => setData(prev => ({ ...prev, payrollDetails: { bank, branch, accountNumber, kra, nssf, nhif }})), [bank, branch, accountNumber, kra, nssf, nhif])

    // Validation helper
    const isFormValid = () => 
    {
        return bank && branch && accountNumber && kra && nssf && nhif
    }

    // Handle Next button
    const handleNext = () => 
    {
        if (!isFormValid()) 
        {
            toast.error("Please fill all required payroll fields before proceeding.")
            return
        }
        setStep(6)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="mt-1.5 space-y-1.5">
                    <label className={labelStyling}>Bank Name{requiredInputLabel()}</label>
                    <select className={select} value={bank} onChange={(e) => setBank(e.target.value)}>
                        <option value="">Select bank</option>
                        {banks.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>

                <div className="mt-1.5 space-y-1.5">
                    <label className={labelStyling}>Branch{requiredInputLabel()}</label>
                    <select className={select} value={branch} onChange={(e) => setBranch(e.target.value)}>
                        <option value="">Select branch</option>
                        {branches.map(br => <option key={br} value={br}>{br}</option>)}
                    </select>
                </div>

                <div className="mt-1.5 space-y-1.5">
                    <label className={labelStyling}>Account Number{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g 1234567890" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </div>

                <div className="mt-1.5 space-y-1.5">
                    <label className={labelStyling}>KRA PIN{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g A123456789B" value={kra} onChange={(e) => setKra(e.target.value)} />
                </div>

                <div className="mt-1.5 space-y-1.5">
                    <label className={labelStyling}>NSSF Number{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g 1234567" value={nssf} onChange={(e) => setNssf(e.target.value)} />
                </div>

                <div className="mt-1.5 space-y-1.5">
                    <label className={labelStyling}>NHIF (SHA) Number{requiredInputLabel()}</label>
                    <input type="text" className={inputStyling} placeholder="E.g 123456789" value={nhif} onChange={(e) => setNhif(e.target.value)} />
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-2">
                <button className='btn btn-neutral' onClick={() => setStep(3)}>Back</button>
                <button className={`btn btn-success text-white ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleNext}>Next</button>
            </div>
        </>
    )
}

export default PayrollDetails