import { useState } from "react"
import OTPInput from "react-otp-input"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const VerifyOTP = () => 
{
    const [otp, setOTP] = useState()
    const [otpVerifying, setOTPVerifying] = useState(false)

    const navigate = useNavigate()

    const verifyOTP = e =>
    {
        e.preventDefault()
        console.log(otp)

        // Check if OTP is fully entered
        if (!otp || otp.length !== 6) 
        {
            toast.error("Please enter the complete 6-digit OTP")
            return
        }

        try
        {
            // Logic to generate OTP and send to the user's email
            toast.success("OTP verified successfully!", 
            {
                onClose: () => 
                {
                    navigate("/password-reset/new-password")
                }
            })
        }
        catch(error)
        {
            console.error("Error verifying OTP:", error)
            toast.error("An error occurred while verifying OTP. Please try again.")
            return
        }
        finally
        {
            // Reset email input after attempting to generate OTP
            setOTP("")

            //Reset OTP verification state in case of any unforeseen errors that might occur outside the try-catch block
            setOTPVerifying(false)
        }
    }

    return ( 
        <form onSubmit={verifyOTP} className="w-full space-y-6 text-center">'
            <div className="space-y-2">
                <h2 className="text-2xl font-bold uppercase text-gray-800">OTP verification</h2>
                <p className="text-gray-500 text-sm md:text-base">Enter the 6-digit code sent to your email</p>
            </div>
            <OTPInput value={otp} onChange={setOTP} numInputs={6} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props} />} shouldAutoFocus={true} containerStyle={"flex justify-between items-center gap-2 w-full"} inputStyle={{ width: "3rem", height: "3.5rem", border: "1px  solid #d1d5db",  borderRadius: "0.5rem", textAlign: "center", fontSize: "1.125rem",   color: "#374151", outline: "none", transition: "all 0.2s ease", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", }} focusStyle={{ borderColor: "#2563eb", boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.4)",}}/>
            <button type="submit" className={`btn btn-success w-full text-white mt-3 ${otpVerifying ? 'opacity-50 cursor-not-allowed ' : ''}`}>
                {
                    otpVerifying 
                    ? 
                        <span className="flex items-center justify-center"><FaSpinner className="animate-spin mr-2" />Verifying OTP...</span> 
                    : 
                    "Verify OTP"
                }
            </button>
        </form>
    )
}
 
export default VerifyOTP