import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import AdminDashboard from "./pages/Admin/Dashboard";
import MangeTasks from "./pages/Admin/ManageTasks";
import CreateTasks from "./pages/Admin/CreateTasks";
import ManageUsers from './pages/Admin/ManageUsers'
import MyTasks from './pages/Users/MyTasks'
import UserDashboard from "./pages/users/Dashboard";
import ViewTaskDetails from "./pages/Users/ViewTaskDetails";
import PrivateRoute from "./routes/PrivateRoute";
function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute allowedRoles={["admin"]}/>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="task" element={<MangeTasks />} />
            <Route path="create_tasks" element={<CreateTasks />}/>
            <Route path="manage_users" element={<ManageUsers />}/>
            </Route>
            {/* User Routes */}
            <Route path="/user" element={<PrivateRoute allowedRoles={["user"]}/>}>
            <Route path="dashboard" element={<UserDashboard/>}/>
            <Route path="my_task" element={<MyTasks/>}/>
            <Route path="task_details/:id" element={<ViewTaskDetails/>}/>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
