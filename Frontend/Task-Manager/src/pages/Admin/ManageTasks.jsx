import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
function ManageTasks() {
  const [allTask, setAllTask] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTask = async () => {};

  const handelClick = (taskData) => {
    navigate(`/admin/create_tasks`, { state: { taskId: taskData } });
  };

  const handelDownloadReport = async () => {};

  useEffect(() => {
    getAllTask(filterStatus);
    return () => {};
  }, [filterStatus]);

  return <DashboardLayout activeMenu="Manage Task"></DashboardLayout>;
}

export default ManageTasks;
