import { getCountryName } from "../../../Utils/CountryName"
import { FaSpinner } from "react-icons/fa6"

import Table from "../../../Components/Table"
import StepEditIcon from "../../../Components/StepEditIcon"

const Summary = ({ data, setStep, createEmployeeAccount, accountType, loading, users, roles,  branches, departments }) =>
{
  const { surname, firstName, lastName, email, phoneNumber, gender, maritalStatus, dob, idNo, qualifications, employmentDetails, payrollDetails, uploads } = data

  const cardStyling = "bg-white p-5 rounded-lg shadow-md"
  const titleStyling = "text-2xl font-bold text-center uppercase"
  const editHeaderStyling = "flex justify-between items-center border-b pb-2 mb-3"

  //Finding the names of the branches, departments, roles, HOD, GM, HR from respective lists
  let branchName = "N/A"
  let departmentName = "N/A"  
  let roleName = "N/A"
  let hodName = "N/A"
  let gmName = "N/A"
  let hrName = "N/A"

  if (employmentDetails)
  {
    const branch = branches?.find(b => b.id === Number(employmentDetails.branch))
    const department = departments?.find(d => d.id === Number(employmentDetails.department))
    const role = roles?.find(r => r.id === Number(employmentDetails.role))
    const hodUser = users?.find(u => u.id === Number(employmentDetails.hod))
    const gmUser = users?.find(u => u.id === Number(employmentDetails.gm))
    const hrUser = users?.find(u => u.id === Number(employmentDetails.hr))

    branchName = branch ? branch.name : "N/A"
    departmentName = department ? department.name : "N/A"
    roleName = role ? role.name : "N/A"
    hodName = hodUser ? `${hodUser.firstName} ${hodUser.lastName}` : "N/A"
    gmName = gmUser ? `${gmUser.firstName} ${gmUser.lastName}` : "N/A"
    hrName = hrUser ? `${hrUser.firstName} ${hrUser.lastName}` : "N/A"
  }

  // Table config for qualifications
  const qualificationHeaders = [
    { label: "Education Level" },
    { label: "Field of Study" },
    { label: "Institution" },
    { label: "Graduation Year" }
  ]

  const renderQualificationRow = (q, idx, td) => (
    <>
      <td className={td}>{q.highestLevel}</td>
      <td className={td}>{q.field}</td>
      <td className={td}>{q.institution}</td>
      <td className={td}>{q.graduationYear}</td>
    </>
  )



  return (
    <>
      {/* Employee Info */}
      <div className={cardStyling}>
        <div className={editHeaderStyling}>
          <h2 className={titleStyling}>Employee Information</h2>
          <StepEditIcon setStep={setStep} step={2}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div><strong>Surname:</strong> {surname}</div>
          <div><strong>First Name:</strong> {firstName}</div>
          <div><strong>Last Name:</strong> {lastName}</div>
          <div><strong>Email:</strong> {email}</div>
          <div><strong>Phone:</strong> {phoneNumber}</div>
          <div><strong>Gender:</strong> {gender}</div>
          <div><strong>Marital Status:</strong> {maritalStatus}</div>
          <div><strong>Date of Birth:</strong> {dob}</div>
          <div><strong>National ID / Passport:</strong> {idNo}</div>
        </div>
      </div>

      {/* Qualifications */}
      {
        accountType !== "Admin" && 
        (
          <div className={cardStyling}>
            <div className={editHeaderStyling}>
              <h2 className={titleStyling}>Employee Qualifications</h2>
              <StepEditIcon setStep={setStep} step={4}/>
            </div>
            {
              qualifications.length === 0
              ?
                <p className="text-center">No qualifications added.</p>
              :
                <Table headers={qualificationHeaders} data={qualifications} emptyMessage="No qualifications added." renderRow={renderQualificationRow}/>
            }
          </div>
        )
      }

      {/* Employment Details */}
      <div className={cardStyling}>
        <div className={editHeaderStyling}>
          <h2 className={titleStyling}>Employment Details</h2>
          <StepEditIcon setStep={setStep} step={3}/>
        </div>
        {
          employmentDetails &&
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><strong>Country:</strong> {getCountryName(employmentDetails.country)}</div>
              <div><strong>Branch:</strong> {branchName}</div>
              <div><strong>Department:</strong> {departmentName}</div>
              <div><strong>Role:</strong> {roleName}</div>
              <div><strong>Start Date:</strong> {employmentDetails.startDate}</div>
              {accountType !== "Admin" && (
                <>
                  <div><strong>Direct Control (HOD):</strong> {hodName}</div>
                  <div><strong>General Manager:</strong> {gmName}</div>
                  <div><strong>Human Resource Manager:</strong> {hrName}</div>
                </>
              )}
            </div>
        }
      </div>

      {/* Bank & Tax Details */}
      {
        accountType !== "Admin" && 
        (
          <div className={cardStyling}>
            <div className={editHeaderStyling}>
              <h2 className={titleStyling}>Payroll Details</h2>
              <StepEditIcon setStep={setStep} step={5}/>
            </div>
            {
              payrollDetails && 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><strong>Bank Name:</strong> {payrollDetails.bank}</div>
                  <div><strong>Branch:</strong> {payrollDetails.branch}</div>
                  <div><strong>Account Number:</strong> {payrollDetails.accountNumber}</div>
                  <div><strong>KRA PIN:</strong> {payrollDetails.kra}</div>
                  <div><strong>NSSF Number:</strong> {payrollDetails.nssf}</div>
                  <div><strong>NHIF / SHA Number:</strong> {payrollDetails.nhif}</div>
                </div>
            }
          </div>
        )
      }

      {/* Uploaded Files */}
      {
        accountType !== "Admin" && 
        (
          <div className={cardStyling}>
            <div className={editHeaderStyling}>
              <h2 className={titleStyling}>Uploaded Documents</h2>
              <StepEditIcon setStep={setStep} step={6}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {
                uploads && Object.keys(uploads).map((key) =>
                {
                  const file = uploads[key]
                  if (!file || (Array.isArray(file) && file.length === 0)) return null

                  // Title mapping
                  const titles = {
                    cv: "Curriculum Vitae",
                    terms: "Terms of Agreement (Signed)",
                    bankStatement: "Statement of Bank Details",
                    kra: "KRA PIN",
                    nssf: "NSSF Certificate",
                    nhif: "NHIF (SHA) Certificate",
                    educationFiles: "Education Certificates",
                    others: "Other Documents"
                  }

                  return (
                    <div key={key} className="space-y-1">
                      <strong>{titles[key] || key}</strong>
                      {
                        Array.isArray(file)
                        ?
                          file.map((f, idx) =>
                            <p key={`${key}-${idx}`}>
                              <a href={URL.createObjectURL(f)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{f.name}</a>
                            </p>
                          )
                        :
                          <p>
                            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{file.name}</a>
                          </p>
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }

      {/* Navigation / Submit */}
      <div className="flex justify-between mt-5">
        <button className='btn btn-neutral' onClick={() => setStep(accountType === "Admin" ? 3 : 6)}>Back</button>
        <button className={`btn btn-success text-white ${loading ? "cursor-not-allowed opacity-70" : ""}`} onClick={createEmployeeAccount}>
          {
            loading 
            ? 
              <>
                  <FaSpinner className="animate-spin mr-2" />
                  Creating account...
              </>
            : 
              "Create account"
          }
        </button>
      </div>
    </>
  )
}

export default Summary