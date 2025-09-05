import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import UserContext from "../../context/CreateContext";
import { axiosInstances } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";
import { TaskListTable } from "../../components/tasklisttable/TaskListTable";
import { useNavigate } from "react-router-dom";
DashboardLayout;
import { CustomPiChart } from "../../components/chart/CustomPiChart";
import { CustomBarChart} from "../../components/chart/CustomBarChart";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/card/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [dashBoardData, setDashBoardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const COLORS = ["#8D51FF","#00B8DB","#7BCE00"]

 


  // prepare chart data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriority = data?.taskPriority || null;
    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];
    setPieChartData(taskDistributionData)
    const taskPriorityLevelData = [
      { priority: "Low", count: taskPriority?.Low || 0 },
      { priority: "Medium", count: taskPriority?.Medium || 0 },
      { priority: "High", count: taskPriority?.High || 0 },
    ];
    setBarChartData(taskPriorityLevelData)
  };
  useEffect(() => {
     const getDashBoardData = async () => {
      try {
        const response = await axiosInstances(
          API_PATHS.TASK.ADMIN_DASHBOARD_DATA
        );
        if (response) {
          setDashBoardData(response?.data);
          prepareChartData(response?.data?.data||null);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getDashBoardData();
  }, []);


  const onSeeMore = () => {
    navigate("/admin/task");
  };
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className="col-span-3">
          <div className="text-xl md:text-2xl">
            <h2>
              {" "}
              Hello! <span className="text-indigo-600">{user?.name}</span>{" "}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Task"
            color="bg-indigo-600"
            value={addThousandsSeparator(
              dashBoardData?.data?.taskDistribution?.All || 0
            )}
          />
          <InfoCard
            label="Pending Task"
            color="bg-violet-500"
            value={addThousandsSeparator(
              dashBoardData?.data?.taskDistribution?.Pending || 0
            )}
          />
          <InfoCard
            label="In Progress Task"
            color="bg-cyan-500"
            value={addThousandsSeparator(
              dashBoardData?.data?.taskDistribution?.InProgress || 0
            )}
          />
          <InfoCard
            label="Completed Task"
            color="bg-lime-600"
            value={addThousandsSeparator(
              dashBoardData?.data?.taskDistribution?.Completed|| 0
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
         
            <div className="card">
              <div className="min-w-full flex items-center justify-between ">
                <h5 className="font-medium">Task Distribution</h5>
              </div>
              {/* data charts */}
              <CustomPiChart
              data={pieChartData}
              label="Total Balance"
              colors ={COLORS}
              />
            </div>
            <div className="card">
              <div className="min-w-full flex items-center justify-between ">
                <h5 className="font-medium">Task Priority Level</h5>
              </div>
              <CustomBarChart
              data={barChartData}
              label="Total Balance"
              colors ={COLORS}
              />
            </div>
        
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Task</h5>
              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="" />
              </button>
            </div>
            <TaskListTable tableData={dashBoardData?.data?.recentTask || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
