import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import SharesAppContainer from './containers/SharesAppContainer';
import AddShareContainer from './containers/AddShareContainer';
import {getShares, postShare, deleteShare, updateShare, convertDataForChart, getDataForShare, getTotalValueDB} from './SharesService';
import getApiKey from './key';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import CalculatorContainer from './containers/CalculatorContainer';




function App() {
  const apiKey = getApiKey();

  const [shares, setShares] = useState([]);
  const [totalShareData, setTotalShareData] = useState([]);


  useEffect(() => {
   getAll()
  },[]);

  const getAll = () => {
    getShares()
    .then((allShares) => setShares(allShares));
  }







  const removeShare = (id) => {
    deleteShare(id)
    .then(() => getAll());
  }

  const addNewShare = (newShare) => {
    postShare(newShare)
    .then(() => getAll());
  }

  const updateNoOfShares = (id, payload) => {
    updateShare(id, payload)
    .then(() => getAll());
  }

  return (
    
    <Router>
      <NavBar className = "navbar"/>
      <Routes>
        <Route path="/" element={<SharesAppContainer shares={shares} totalShareData={totalShareData} removeShareFromDB={id => removeShare(id)} updateShareNo={(id, payload) => updateNoOfShares(id, payload)}/>} />
        <Route path="/add" element={<AddShareContainer apiKey={apiKey} postShareObject={newShare => addNewShare(newShare)} shares={shares} removeShareFromDB={id => removeShare(id) }/>} />
        <Route path="/calculator" element={<CalculatorContainer/>} />
      </Routes>
    </Router>


  );
}


export default App
