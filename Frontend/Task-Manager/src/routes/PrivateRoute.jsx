import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateRoute({allowedRoles}){
const usersRole ={
    "admin":()=>{
      <Outlet/>
    },
    "user":()=>{
      <Outlet/>
    }
}
return(
    usersRole[allowedRoles]()
)}

export default PrivateRoute
