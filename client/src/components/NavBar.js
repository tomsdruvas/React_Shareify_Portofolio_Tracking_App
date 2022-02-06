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
   
      <li onClick={handleShowHome} >
        <i className="fas fa-home"> Home</i> 
      </li>
      
      <li onClick={handleShowAddChart}>
      <i  className="fas fa-plus-circle"> Add Shares</i>
      </li>
      
      <li onClick={handleShowCalc} >
      <i className="fas fa-calculator"> Calculator</i>
      </li>
      
    </ul>

    
    </>
  );
}

export default NavBar;