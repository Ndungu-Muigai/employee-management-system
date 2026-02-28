import { Routes, Route } from "react-router-dom";

import IntroText from "../../Components/IntroText";
import EmailConfirmation from "./Steps/EmailConfirmation"
import OTPVerification from "./Steps/OTPVerification";
import NewPassword from "./Steps/NewPassword";
import Logo from "../../../assets/Logo.png"

const PasswordReset = () => 
{
    return ( 
        <div className="min-h-screen flex flex-col md:flex-row">
            <IntroText/>
            <div className="grid-2">
                <div className="form-styling">
                    <img src={Logo} alt="Logo" className="mb-2"/>
                    <Routes>
                        <Route path="/" element={<EmailConfirmation/>}></Route>
                        <Route path="/otp-verification" element={<OTPVerification/>}></Route>
                        <Route path="/new-password" element={<NewPassword/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
     );
}
 
export default PasswordReset;