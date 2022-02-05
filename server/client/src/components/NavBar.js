import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({chartType}) => {

  const handleShowAddChart = () => {
    chartType("Add_share")
  }

  const handleShowHome = () => {
    chartType("Total")
  }
  const handleShowCalc = () => {
    chartType("Calc")
  }


  return (
    <>
    
    <ul className="navbar">
      <div className="navbar-button">
      <li>
        <button onClick={handleShowHome}><i className="fas fa-home"></i> Home</button>
      </li>
      </div>
      <div className="navbar-button">
      <li>
        <><button onClick={handleShowAddChart} ><i className="fas fa-plus-circle"></i> Add Shares</button></>
      </li>
      </div>
      <div className="navbar-button">
      <li>
      <button onClick={handleShowCalc} ><i className="fas fa-calculator"></i> Calculator</button>
      </li>
      </div>
    </ul>
    </>
  );
}

export default NavBar;