import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const NewPassword = () => 
{
    const iconSize  = 18

    const [passwordDetails, setPasswordDetails] = useState(
    {
        new_password: '',
        confirm_password: ''
    })
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false)
    const navigate = useNavigate()

    const togglePasswordVisibility = () => setPasswordVisibility(prevState => !prevState)
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisibility(prevState => !prevState)

    const passwordCriteria = 
    {
        length: passwordDetails.new_password.length >= 10,
        lowercase: /[a-z]/.test(passwordDetails.new_password),
        uppercase: /[A-Z]/.test(passwordDetails.new_password),
        number: /\d/.test(passwordDetails.new_password),
        specialChar: /[!@#$%^&*]/.test(passwordDetails.new_password)
    }

    const updatedFormDetails = e => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })

    const updatePaswword = e =>
    {
        e.preventDefault()
        console.log(passwordDetails)
        if(passwordDetails.new_password === passwordDetails.confirm_password)
        {
            toast.success("The two passwords match",
                {
                    onClose: () =>
                    {
                        setPasswordDetails({new_password: '', confirm_password: ''})
                        navigate("/dashboard")
                    }
                }
            )
        }
        else
        {
            toast.error("The two passwords do not match")
            return
        }
    }

    return( 
        <form onSubmit={updatePaswword} className="space-y-1">
            <h2 className="font-bold text-center text-2xl text-gray-800">Set new password</h2>
            <p className='text-md font-semibold my-2'>To protect your account, we require that your password:</p>
            <ul className="mb-1 ms-7 space-y-2 list list-disc">
                <li className={`mb-1 ${passwordCriteria.length ? 'text-green-500' : 'text-gray-500'}`}>Has a minimum of 10 characters</li>
                <li className={`mb-1 ${passwordCriteria.lowercase ? 'text-green-500' : 'text-gray-500'}`}>Contains at least one lowercase letter</li>
                <li className={`mb-1 ${passwordCriteria.uppercase ? 'text-green-500' : 'text-gray-500'}`}>Contains at least one uppercase letter</li>
                <li className={`mb-1 ${passwordCriteria.number ? 'text-green-500' : 'text-gray-500'}`}>Contains at least one digit (0-9)</li>
                <li className={`mb-1 ${passwordCriteria.specialChar ? 'text-green-500' : 'text-gray-500'}`}>Contains at least one special character (!@#$%^&*+()_{}:;)</li>
            </ul>
            <div>
                <label htmlFor="new_password" className="block text-gray-700 font-semibold">Password</label>
                <div className="relative">
                    <input type={passwordVisibility ? "text" : "password"} name="new_password" id="new_password" value={passwordDetails.password} onChange={updatedFormDetails} placeholder="••••••••" required className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"/>
                    <div className="absolute right-3 top-5 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                        {
                            passwordVisibility 
                            ? 
                                <FaEyeSlash size={iconSize}/> 
                            : 
                                <FaEye size={iconSize}/>
                        }
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold">Confirm Password</label>
                <div className="relative">
                    <input type={confirmPasswordVisibility ? "text" : "password"} name="confirm_password" id="password" value={passwordDetails.confirm_password} onChange={updatedFormDetails} placeholder="••••••••" required className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"/>
                    <div className="absolute right-3 top-5 text-gray-500 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                        {
                            confirmPasswordVisibility 
                            ? 
                                <FaEyeSlash size={iconSize}/> 
                            : 
                                <FaEye size={iconSize}/>
                        }
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-success w-full text-white mt-1">Update password</button>
        </form>
    )
}
 
export default NewPassword