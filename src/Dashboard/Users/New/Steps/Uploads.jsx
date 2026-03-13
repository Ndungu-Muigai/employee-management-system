import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Uploads = ({ labelStyling, setStep, requiredInputLabel, data, setData }) => 
{
    const handleFileChange = (e, key, multiple = false) => 
    {
        const files = multiple ? Array.from(e.target.files) : e.target.files[0]
        setData(prev => ({ ...prev, uploads: {  ...prev.uploads, [key]: files } }))
    }

    // Helper to create temporary URL for preview
    const fileLink = (file) => file ? URL.createObjectURL(file) : "#"

    const { uploads } = data

    const validateUploads = () => 
    {
        const requiredFields = {
            cv: "Curriculum Vitae",
            terms: "Terms of Agreement (Signed)",
            bankStatement: "Statement of Bank Details",
            kra: "KRA PIN",
            nssf: "NSSF Certificate",
            nhif: "NHIF (SHA) Certificate",
            educationFiles: "Education Certificates"
        }

        const missingFields = []

        for (let key in requiredFields) 
        {
            const value = uploads[key]
            if (!value || (Array.isArray(value) && value.length === 0)) 
            {
                missingFields.push(requiredFields[key])
            }
        }

        if (missingFields.length > 0) {
            toast.error(
                <div>
                    <p>Please upload the following files:</p>
                    <ul className="list-disc pl-5">
                        {missingFields.map((field) => (
                            <li key={field}>{field}</li>
                        ))}
                    </ul>
                </div>,
                {
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true
                }
            )
            return false
        }

        return true
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* CV */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Curriculum Vitae{requiredInputLabel()}</label>
                    <input type="file" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "cv")} />
                    {uploads.cv && (
                        <p className="text-sm text-blue-600 hover:underline">
                            <a href={fileLink(uploads.cv)} target="_blank" rel="noopener noreferrer">{uploads.cv.name}</a>
                        </p>
                    )}
                </div>

                {/* Terms of Agreement */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Terms of Agreement (Signed){requiredInputLabel()}</label>
                    <input type="file" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "terms")} />
                    {uploads.terms && (
                        <p className="text-sm text-blue-600 hover:underline">
                            <a href={fileLink(uploads.terms)} target="_blank" rel="noopener noreferrer">{uploads.terms.name}</a>
                        </p>
                    )}
                </div>

                {/* Statement of Bank Details */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Statement of Bank Details{requiredInputLabel()}</label>
                    <input type="file" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "bankStatement")} />
                    {uploads.bankStatement && (
                        <p className="text-sm text-blue-600 hover:underline">
                            <a href={fileLink(uploads.bankStatement)} target="_blank" rel="noopener noreferrer">{uploads.bankStatement.name}</a>
                        </p>
                    )}
                </div>

                {/* KRA */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>KRA PIN{requiredInputLabel()}</label>
                    <input type="file" accept="image/*,application/pdf" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "kra")} />
                    {
                        uploads.kra && (
                            <p className="text-sm text-blue-600 hover:underline" title="Click to view uploaded file">
                                <a href={fileLink(uploads.kra)} target="_blank" rel="noopener noreferrer">{uploads.kra.name}</a>
                            </p>
                        )
                    }
                </div>

                {/* NSSF */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>NSSF Certificate{requiredInputLabel()}</label>
                    <input type="file" accept="image/*,application/pdf" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "nssf")} />
                    {
                        uploads.nssf && (
                            <p className="text-sm text-blue-600 hover:underline" title="Click to view uploaded file">
                                <a href={fileLink(uploads.nssf)} target="_blank" rel="noopener noreferrer">{uploads.nssf.name}</a>
                            </p>
                        )
                    }
                </div>

                {/* NHIF */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>NHIF (SHA) Certificate{requiredInputLabel()}</label>
                    <input type="file" accept="image/*,application/pdf" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "nhif")} />
                    {
                        uploads.nhif && (
                            <p className="text-sm text-blue-600 hover:underline" title="Click to view uploaded file">
                                <Link to={fileLink(uploads.nhif)} target="_blank" rel="noopener noreferrer">{uploads.nhif.name}</Link>
                            </p>
                        )
                    }
                </div>

                {/* Education Certificates */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Education Certificates {requiredInputLabel()}</label>
                    <input type="file" multiple accept="image/*,application/pdf" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "educationFiles", true)} />
                    <p className="text-sm text-gray-500">You can select multiple files at once by holding Ctrl (Cmd on Mac).</p>
                    {
                        uploads.educationFiles.length > 0 && (
                            <ul className="text-sm text-gray-500 list-disc pl-5">
                                {
                                    uploads.educationFiles.map((file, index) => (
                                        <li key={index} className="text-sm text-blue-600 hover:underline" title="Click to view uploaded file">
                                            <a href={fileLink(file)} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>

                {/* Others */}
                <div className="mt-2 space-y-2">
                    <label className={labelStyling}>Others</label>
                    <input type="file" multiple accept="image/*,application/pdf" className="file-input file-input-bordered file-input-neutral w-full bg-inherit"
                        onChange={(e) => handleFileChange(e, "others", true)} />
                    <p className="text-sm text-gray-500">You can select multiple files at once by holding Ctrl (Cmd on Mac).</p>
                    {
                        uploads.others.length > 0 && (
                            <ul className="text-sm text-gray-500 list-disc pl-5">
                                {
                                    uploads.others.map((file, index) => (
                                        <li key={index} className="text-sm text-blue-600 hover:underline" title="Click to view uploaded file">
                                            <a href={fileLink(file)} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-5">
                <button className='btn btn-neutral' onClick={() => setStep(5)}>Back</button>
                <button className='btn btn-success text-white' onClick={() => validateUploads() ? setStep(7) : null}>Next</button>
            </div>
        </>
    )
}

export default Uploads