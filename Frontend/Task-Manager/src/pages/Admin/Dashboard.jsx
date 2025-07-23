import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import UserContext from "../../context/CreateContext";
import { axiosInstances } from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
DashboardLayout;
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

  const getDashBoardData = async () => {
    try {
      const response = await axiosInstances(
        API_PATHS.TASK.ADMIN_DASHBOARD_DATA
      );
      if (response) {
        setDashBoardData(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getDashBoardData();
  }, []);
  console.log(dashBoardData);
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
          value={addThousandsSeparator(dashBoardData?.data?.taskDistribution?.All||0)}
          />
           <InfoCard
          label="Pending Task"
          color="bg-violet-500"
          value={addThousandsSeparator(dashBoardData?.data?.taskDistribution?.pendingTask||0)}
          />
           <InfoCard
          label="In Progress Task"
          color="bg-cyan-500"
          value={addThousandsSeparator(dashBoardData?.data?.taskDistribution?.InProgress||0)}
          />
          <InfoCard
          label="Completed Task"
          color="bg-lime-600"
          value={addThousandsSeparator(dashBoardData?.charts?.taskDistribution?.Completed||0)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
