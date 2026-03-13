import { Route, Routes } from "react-router-dom";
import Department from "./Department/Page";
import Departments from "./Home/Page";

const DepartmentsLayout = () => 
{
    return ( 
        <>
            <Routes>
                <Route path="/" element={<Departments/>}></Route>
                <Route path="/:id" element={<Department/>}></Route>
            </Routes>
        </>
     );
}
 
export default DepartmentsLayout;