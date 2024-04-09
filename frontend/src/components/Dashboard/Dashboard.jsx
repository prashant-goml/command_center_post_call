import React from 'react';
import { Link } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#F5F5F5", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="text-2xl font-bold mb-4 text-blue-900 mt-8">Command Center Development</h1>
      <div className="dashboard flex flex-wrap justify-center items-center mt-4">
        <div className="box-container flex-1 rounded-lg bg-red-500 shadow-md mx-2 my-2" >
          <div className="box p-4"> <a href="/Survey"> Post call</a></div>
        </div>
        <div className="box-container flex-1 rounded-lg bg-red-500 shadow-md mx-2 my-2">
          <div className="box p-4">Voicemail</div>
        </div>
        <div className="box-container flex-1 rounded-lg bg-red-500 shadow-md mx-2 my-2">
          <div className="box p-4">QuickSight Dashboard</div>
        </div>
        <div className="box-container flex-1 rounded-lg bg-red-500 shadow-md mx-2 my-2">
          <div className="box p-4">Holiday Calendar</div>
        </div>
        <div className="box-container flex-1 rounded-lg bg-red-500 shadow-md mx-2 my-2">
          <div className="box p-4">Announcement Checker</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;