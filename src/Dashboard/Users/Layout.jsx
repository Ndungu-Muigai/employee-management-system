import { Routes, Route } from "react-router-dom"
import Employees from "./Home/Page"
import NewEmployee from "./New/Page"
import Employee from "./User/Page"
import ErrorPage from "../../Error Page/Page"

const UsersLayout = ({ country }) => 
{
    return ( 
        <div className="px-2 py-3">
            <Routes>
                <Route path="/" element={<Employees/>}></Route>
                <Route path="/new" element={<NewEmployee country={country}/>}></Route>
                <Route path="/:id" element={<Employee/>}></Route>
                <Route path="*" element={<ErrorPage/>}></Route>
            </Routes>
        </div>
    )
}
 
export default UsersLayout