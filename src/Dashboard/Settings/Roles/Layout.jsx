import { Route, Routes } from "react-router-dom"

import Permissions from "../../Data/Permissions.json"

import ErrorPage from "../../../Error Page/Page"
import Roles from "./Home/Page"
import Role from "./Role/Page"

const RolesLayout = () => 
{
    const permissionsList = Object.values(Permissions)

    const roleTypes = [
        {
            title: "Employee",
            value: "Employee"
        },
        {
            title: "Admin (Expartriates)",
            value: "Admin"
        }
    ]

    return ( 
        <>
            <Routes>
                <Route path="/" element={<Roles permissionsList={permissionsList} roleTypes={roleTypes}/>}></Route>
                <Route path="/:id" element={<Role permissionsList={permissionsList} roleTypes={roleTypes}/>}></Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}
 
export default RolesLayout