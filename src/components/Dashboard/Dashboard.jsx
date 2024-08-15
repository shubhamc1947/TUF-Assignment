// components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Navigation from "../Navigation/Navigation";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const [banner, setBanner] = useState({
    description: "",
    targetDate: "",
    link: "",
    isVisible: true,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/banner").then((response) => {
      const data = response.data;
      const formattedDate = formatDateToLocal(data.targetDate);
      setBanner({
        description: data.description || "",
        targetDate: formattedDate || "",
        link: data.link || "",
        isVisible: data.isVisible || true,
      });
    });
  }, []);

  const formatDateToLocal = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBanner({
      ...banner,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // toast.error('Wrong credentials, please try again!');
  // toast.success('Successfully logged in!');
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/banner", banner)
      .then((response) => toast.success(response.data.message))
      .catch((response)=> toast.error('Something went wrong : ',response.data.message));
  };

  return (
    <div className="dashboard-container">
      <div className="heading">
        <h1 className="dashboard-title">Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div>
        <Navigation/>
      </div>
      <div className="dashboard">
        <div className="cont">
          <h1>Banner Settings</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <span className="label-text">Banner Description:</span>
              <textarea
                name="description"
                value={banner.description || ""}
                onChange={handleInputChange}
                placeholder="Enter the description for the banner"
              />
            </label>
            <label>
              <span className="label-text">Target Date and Time:</span>
              <input
                type="datetime-local"
                name="targetDate"
                value={banner.targetDate || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span className="label-text">Banner Link:</span>
              <input
                type="text"
                name="link"
                value={banner.link || ""}
                onChange={handleInputChange}
                placeholder="Enter the URL for the banner link"
              />
            </label>
            <label className="toggle-switch">
              <span className="label-text">Banner On/Off:</span>
              <div className="switch">
                <input
                  type="checkbox"
                  name="isVisible"
                  id="toggle"
                  checked={banner.isVisible}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </div>
            </label>
            <button type="submit">Update Banner</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
