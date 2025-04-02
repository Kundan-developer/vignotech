 

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
      <StudentTable />
    </div>
  );
};

export default Dashboard;

