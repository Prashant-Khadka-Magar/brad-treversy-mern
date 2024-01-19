import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import AddGoals from "../components/AddGoals";
import DisplayGoals from "../components/DisplayGoals";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div className="flex flex-col items-center">
    <div className="mt-5">
      <AddGoals/>
      <DisplayGoals/>
    </div>
  </div>;
}

export default Dashboard;
