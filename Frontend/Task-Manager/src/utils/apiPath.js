export const BASE_URL = "http://localhost:8000"; //BACKEND BASE URL

export const API_PATHS = {
  AUTH:{
    REGISTER: "/api/auth/register", // TO REGISTER USER
    LOGIN: "/api/auth/login", // TO USERS LOGIN
    LOGOUT: "/api/auth/logout", // TO USERS LOGOUT
  },

  USER:{
    GET_ALL_USER: "/api/users", // TO GET ALL USERS
    DElETE_USER: (userId) => {  // TO DELETE USER BY ID
    return `api/users/${userId}`;
    },

    CREATE_USERS: "api/users", // TO CREATE USER
    GET_USER_BY_ID: (userId) => { // TO GET ID BY USER
      return `api/users/${userId}`;
    },

    UPDATE_USER: (userId) => { // TO UPDATE USER BY ID
    return `api/users/${userId}`;
    },
  },

  TASK: {
   ADMIN_DASHBOARD_DATA:"/api/task/admin_dashboard", // TO GET ADMIN DATA
   USER_DASHBOARD_DATA:"api/task/user_dashboard", // TO GET MEMBERS DATA
   GET_ALL_TASK:"api/task", // TO GET ALL TASK WHICH IS CREATED BY ADMIN

   GET_TASK_BY_ID:(taskId)=>{ // TO GET TASK BY ID 
    return `api/task/${taskId}`
   },

  CREATE_TASK:"api/task/create_task", // TO CREATE NEW TASK
  
  UPDATE_TASK_BY_ID:(taskId)=>{ // TO UPDATE TASK BY ID 
    return `api/task/update_task/${taskId}` 
  },

  GET_TASK_STATUS_BY_ID:(taskId)=>{ // TO GET TASK STATUS BY ID 
    return  `api/task/delete_task/${taskId}` 
  },

  UPDATE_TODO:(taskId)=>{ // TO UPDATE TASK TODO
    return `api/task/update_task_todo/${taskId}`
  }

  },

  REPORTS: {
    TASK: "/api/reports/export/task",
    USERS: "/api/reports/export/user",
  },
  
};
