import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FaSpinner } from "react-icons/fa"

const EmailConfirmation = () => 
{
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [generatingOTP, setGeneratingOTP] = useState(false)

    const generateOTP = e =>
    {
        e.preventDefault()
        setGeneratingOTP(true)

        if(!email)
        {
            toast.error("Please enter your email")
            setGeneratingOTP(false)
            return
        }
        try
        {
            // Logic to generate OTP and send to the user's email
            toast.success("OTP has been sent to your email!", 
            {
                onClose: () => 
                {
                    navigate("/password-reset/otp-verification")
                }
            })
        }
        catch(error)
        {
            console.error("Error generating OTP:", error)
            toast.error("An error occurred while generating OTP. Please try again.")
            return
        }
        finally
        {
            // Reset email input after attempting to generate OTP
            setEmail("")

            //Reset OTP generation state in case of any unforeseen errors that might occur outside the try-catch block
            setGeneratingOTP(false)
        }
        
    }
    return ( 
        <form onSubmit={generateOTP}>
            <h1 className="text-2xl font-bold text-center mb-4">Email Confirmation</h1>
            <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Username</label>
                <div className="relative">
                    <svg className="absolute left-3 top-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20 ">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"/>
                    <button type="submit" className={`btn btn-success w-full text-white mt-3 ${generatingOTP ? 'opacity-50 cursor-not-allowed ' : ''}`}>
                        {
                            generatingOTP 
                            ? 
                                <span className="flex items-center justify-center"><FaSpinner className="animate-spin mr-2" />Generating OTP...</span> 
                            : 
                            "Generate OTP"
                        }
                    </button>
                </div>
            </div>
        </form>
     );
}
 
export default EmailConfirmation;