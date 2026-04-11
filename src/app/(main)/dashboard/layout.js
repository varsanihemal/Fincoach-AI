import { checkUser } from "@/lib/checkUser";
import React from "react";
import DashboardPage from "./page";

const Dashboard = async () => {
  await checkUser();
  return (
    <div className="px-5">
      <h1 className="text-6xl font-bold gradient-title-5 mb-5">Dashboard</h1>
        {/* Dashboardpage */}
        <DashboardPage />
    </div>
  );
};

export default Dashboard;
