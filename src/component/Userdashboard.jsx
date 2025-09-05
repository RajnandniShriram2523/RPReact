import React from 'react';
import './Userdashboard.css';
import Userpanel from './userpanel';


const Userdashboard = () => {
  return (
    <div className="dashboard-container1">
    <Userpanel />
      <div className="dashboard-content1">
        <div className="welcome-card1">
          <h1 className="welcome-text1">Welcome to User Dashboard</h1>
          {/* <p className="subtitle">Manage your system with ease and clarity</p> */}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
