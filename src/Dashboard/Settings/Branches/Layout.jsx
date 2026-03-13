import { Routes, Route } from "react-router-dom"

import Branches from "./Home/Page";
import Branch from "./Branch/Page";
import ErrorPage from "../../../Error Page/Page"

const BranchesLayout = () => 
{
    return ( 
        <>
            <Routes>
                <Route path="/" element={<Branches/>}></Route>
                <Route path="/:id" element={<Branch/>}></Route>
                <Route path="*" element={<ErrorPage/>}></Route>
            </Routes>
        </>
     );
}
 
export default BranchesLayout;