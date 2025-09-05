import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { axiosInstances } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";
import TaskStatusBar from "../../components/layouts/TaskStatusBar";
import { TaskCard } from "../../components/card/TaskCard";
import { LuFileSpreadsheet } from "react-icons/lu";
function ManageTasks() {
  const [allTask, setAllTask] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTask = async () => {
    try {
      const response = await axiosInstances.get(API_PATHS.TASK.GET_ALL_TASK, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });
      if (response) {
        setAllTask(response?.data?.data?.tasks);
        const statusSummary = response?.data?.data.statusSummary || {};

        const statusArray = [
          { label: "All", count: statusSummary?.allTask || 0 },
          {
            label: "Pending",
            count: statusSummary?.pendingTask || 0,
          },
          {
            label: "In Progress",
            count: statusSummary?.inProgressTask || 0,
          },
          {
            label: "Completed",
            count: statusSummary?.completedTask || 0,
          },
        ];
        setTabs(statusArray);
      }
    } catch (error) {
      console.log(
        "Error 500 something went wrong while fetching tasks ",
        error.response.data
      );
    }
  };

  const handelClick = (taskData) => {
    navigate(`/admin/create_tasks`, { state: { taskId: taskData } });
  };

  const handelDownloadReport = async () => {};

  useEffect(() => {
    getAllTask(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Task">
      <div className="my-5">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium md:text-xl">My Task</h2>
            <button
              className="download-btn flex lg:hidden"
              onClick={handelDownloadReport}
            >
              <LuFileSpreadsheet className="text-[15px]" />
              Download Report
            </button>
          </div>
          {allTask.length > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusBar
                tabs={tabs}
                activeTabs={filterStatus}
                setActiveTabs={setFilterStatus}
              />
              <button
                className="download-btn hidden lg:flex"
                onClick={handelDownloadReport}
              >
                <LuFileSpreadsheet className="text-[15px]" />
                Download Report
              </button>
            </div>
          )}
        </div>
        <div className=" mt-5  grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {allTask.map((task, index) => (
            <TaskCard
              key={task.index}
              title={task?.title||""}
              description={task?.description||""}
              priority={task?.priority||""}
              status={task?.status||""}
              progress={task?.progress||""}
              createdAt={task?.createdAt||""}
              dueDate={task?.dueDate||""}
              assignedTo={task?.assignTo.map(
                (member) => member?.profileImageUrl
              )||[]}
              todoCheckList={task?.todoCheckList||""}
              todoCompleted={task?.completedTodoCount||""}
              attachments = {task?.attachments||""}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageTasks;
