import { Routes, Route } from "react-router-dom"

import MyLeave from "./My Leave/Home/Page"
import LeaveForm from "./New/Page"
import PendingLeaveRequests from "./Pending Requests/Home/Page"
import PendingRequestDetails from "./Pending Requests/Request Details/Page"
import ApprovedLeaveRequests from "./Approved Requests/Home/Page"
import ApprovedRequestDetails from "./Approved Requests/Request Details/Page"
import ErrorPage from "../../Error Page/Page"
import LeaveDetails from "./My Leave/Leave/Page"

const LeaveLayout = ({ userGender, country }) => 
{
    return ( 
        <div className="p-2">
            <Routes>
                <Route path="/my-leave" element={<MyLeave userGender={userGender}/>}></Route>
                <Route path="/my-leave/:id" element={<LeaveDetails/>}></Route>
                <Route path="/new" element={<LeaveForm userGender={userGender} country={country}/>}></Route>
                <Route path="/pending-requests" element={<PendingLeaveRequests/>}></Route>
                <Route path="/pending-requests/:id" element={<PendingRequestDetails/>}></Route>
                <Route path="/approved-requests" element={<ApprovedLeaveRequests/>}></Route>
                <Route path="/approved-requests/:id" element={<ApprovedRequestDetails/>}></Route>
                <Route path="*" element={<ErrorPage/>}></Route>
            </Routes>
        </div>
    )
}
 
export default LeaveLayout