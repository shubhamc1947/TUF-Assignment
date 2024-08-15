import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.scss";

const Dashboard = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/banner", banner)
      .then((response) => alert(response.data.message));
  };

  const toggleVisibility = () => {
    const newVisibility = !banner.isVisible;
    setBanner({ ...banner, isVisible: newVisibility });

    axios
      .post("http://localhost:5000/api/banner/visibility", { isVisible: newVisibility ? 1 : 0 })
      .then((response) => alert(response.data.message))
      .catch((error) => console.error("Error updating visibility:", error));
  };

  return (
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
          <label>
            <span className="label-text">Banner On/Off:</span>
            <input
              type="checkbox"
              name="isVisible"
              checked={banner.isVisible}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update Banner</button>
        </form>
        <button onClick={toggleVisibility}>
          {banner.isVisible ? "Hide Banner" : "Show Banner"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
