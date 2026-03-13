import "react-toastify/dist/ReactToastify.css";
import 'react-phone-number-input/style.css'

import { Routes, Route } from "react-router-dom"
import { Slide, ToastContainer } from 'react-toastify'

import Login from "./Home/Pages/Login"
import PasswordReset from "./Home/Pages/Password Reset/Home"
import DashboardLayout from "./Dashboard/Layout"
import ErrorPage from "./Error Page/Page"
const App = () => 
{
  return ( 
    <div className="min-h-screen w-full bg-white text-black">
      <ToastContainer position='top-right' bodyClassName="text-black" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='light' transition={Slide}/>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password-reset/*" element={<PasswordReset/>}></Route>
        <Route path="/dashboard/*" element={<DashboardLayout/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </div>
   )
}
 
export default App