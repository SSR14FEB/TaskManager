import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { axiosInstances } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";
import { PRIORITY_DATA } from "../../utils/data";
import toast from "react-hot-toast";
import { Form, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash } from "react-icons/lu";
import { SelectDropDown } from "../../components/dropdown/SelectDropDown";
import { SelectUser } from "../../components/SelectUser/SelectUser";
import { CheckList } from "../../components/todolist/CheckList";
import Attachments from "../../components/attachments/Attachments";
import { MdAttachFile } from "react-icons/md";
function CreateTasks() {
  const location = useLocation();
  const { taskId } = location.state || "";
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: null,
    assignTo: [],
    todoCheckList: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "",
      dueDate: null,
      assignTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  const createTask = async () => {
    setLoading(true);

    taskData.todoCheckList.forEach((task) => (task.completed = false));
    taskData.todoCheckList.forEach((item) => {
      Reflect.deleteProperty(item, "id");
    });
    taskData.attachments.forEach((item) => {
      Reflect.deleteProperty(item, "id");
    });
    try {
      const response = await axiosInstances.post(API_PATHS.TASK.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(
        "Error 500 something went wrong while creating task",
        error.response
      );
    }
  };
  const uploadTask = () => {};
  console.log(taskData);
  const handelSubmit = async () => {
    setError(null);
    if (taskData.title.trim() == "") {
      setError("Title is required");
      return;
    }
    if (taskData.description.trim() == "") {
      setError("Description is required");
      return;
    }
    if (taskData.priority.trim() == "") {
      setError("Priority is required");
      return;
    }
    if (taskData.dueDate == null) {
      setError("DueDate is required");
      return;
    }
    if (taskData.description.trim() == "") {
      setError("Description is required");
      return;
    }
    if (taskData.assignTo.length == 0) {
      setError("Members are not assigned");
      return;
    }
    if (taskData.todoCheckList.length == 0) {
      setError("Todo are required");
      return;
    }
    if (taskData.attachments.length == 0) {
      setError("Attachments are required");
      return;
    }

    createTask();
  };
  //Reset error
  useEffect(() => {
    setError("");
  }, [
    taskData.title,
    taskData.description,
    taskData.priority,
    taskData.dueDate,
    taskData.assignTo,
    taskData.todoCheckList,
    taskData.attachments,
  ]);

  // get info by task id

  const getTaskDetailsByID = async () => {};
  const deletTask = async () => {};
  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => {
                    setOpenDeleteAlert(true);
                  }}
                >
                  <LuTrash className="text-base" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                className="form-input"
                placeholder="Create App UI"
                value={taskData.title}
                type="text"
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label htmlFor="text-sx font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe Task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropDown
                  option={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select priority"
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  placeholder="Create App UI "
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUser
                  selectedUsers={taskData.assignTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignTo", value);
                  }}
                />
              </div>
            </div>
            <div className="mt-3 col-span-6 md:col-span-12">
              <label className="text-xs font-medium text-slate-600">
                Todo Checklist
              </label>
              <CheckList
                CheckList={taskData.todoCheckList}
                setCheckList={(value) => {
                  handleValueChange("todoCheckList", value);
                }}
                placeholder="Add Task"
                icon=""
              />
            </div>
            <div className="mt-3 col-span-6 md:col-span-12">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <CheckList
                CheckList={taskData.attachments}
                setCheckList={(value) => {
                  handleValueChange("attachments", value);
                }}
                placeholder="Add File Links"
                icon={<MdAttachFile />}
              />
            </div>
            <div className="mt-3 col-span-6 md:col-span-12 text-rose-600 text-sm font-medium ">
              {error}
            </div>
            <button
              className="w-full py-2 mt-3 text-sm font-medium col-span-6 md:col-span-12 text-indigo-600 bg-neutral-50 hover:bg-neutral-100 border border-slate-100/20 rounded-md"
              onClick={handelSubmit}
            >
              CREATE TASK
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateTasks;
