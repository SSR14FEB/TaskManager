import React, { useState } from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { axiosInstances } from '../../utils/axiosInstances'
import { API_PATHS } from '../../utils/apiPath'
import { PRIORITY_DATA } from '../../utils/data'
import toast from "react-hot-toast"
import { useLocation, useNavigate } from 'react-router-dom'
import moment from "moment"
import { LuTrash } from 'react-icons/lu'

function CreateTasks() {
const location = useLocation();
const {taskId} = location.state||""
const [taskData, setTaskData] = useState({
  title:"",
  description:"",
  priority:"Low",
  dueDate:null,
  assignTo:[],
  todoCheckList:[],
  attachments:[]
})
const [currentTask, setCurrentTask] = useState(null)
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
const navigate = useNavigate();
const handleValueChange =(key,value)=>{
  setTaskData((prevData)=>({...prevData,[key]:value}))
}
const clearData =()=>{
  setTaskData({
    title:"",
    description:"",
    priority:"Low",
    dueDate:null,
    assignTo:[],
    todoCheckList:[],
    attachments:[]
  })
}

const createTask =()=>{}
const uploadTask =()=>{}
const handeleSubmit=async()=>{}

// get info by task id

const getTaskDetailsByID = async()=>{}
const deletTask = async()=>{}
  return (
      <DashboardLayout activeMenu="Create Task">
        <div className='mt-5'>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='form-card col-span-3'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl md:text-xl font-medium'>{taskId?"Update Task":"Create Task"}</h2>
                {taskId&&(<button
                className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                onClick={()=>{setOpenDeleteAlert(true)}}>
                  <LuTrash className='text-base'/> Delete
                </button>)}
              </div>
              <div className='mt-4'>
              <label htmlFor="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
              className='form-Input'
              placeholder='Create App UI'
              value={taskData.title}
              type="text"
              onChange={({target})=>(
                handleValueChange("title",target.value)
              )}
              />

              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
  )
}

export default CreateTasks

