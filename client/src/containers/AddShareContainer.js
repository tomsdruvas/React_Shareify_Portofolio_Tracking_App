import React, { useState } from 'react';
import AddShare from '../components/addShare/AddShare';
import FetchShare from '../components/addShare/FetchShare';
import '../components/addShare/AddShare.css'
import CurrentPositionGrid from '../components/addShare/CurrentPositionGrid';


const AddShareContainer = ({apiKey, postShareObject, shares, removeShareFromDB}) => {

    const [shareSearchArray, setShareSearchArray] = useState([]);
    
    const [symbolInfo, setSymbolInfo] = useState({}); 

    const [shareInfo, setShareInfo] = useState({});

    const getShareSearchArray = keywords => {

        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;

        fetch(url)
        .then(response => response.json())
        .then(data => setShareSearchArray(data.bestMatches));
    } 

    const getSymbolInfo = symbol => {

        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

        fetch(url)
        .then(response => response.json())
        .then(data => setSymbolInfo(data['Global Quote']));        
    }

  return (
    <div className="container-box">
      {/* <section id='current-container'>
        <CurrentPositionGrid shares={shares} removeShareFromDB={removeShareFromDB}/>
      </section> */}

       <br />
       <br />
      <div className="add-container">
        <FetchShare getInfo={symbol => getSymbolInfo(symbol)} updateShareInfo={share => setShareInfo(share)} getArray={keywords => getShareSearchArray(keywords)} shareSearchArray={shareSearchArray} clearArray={emptyArray => setShareSearchArray(emptyArray)}/>

        <AddShare symbolInfo={symbolInfo} shareInfo={shareInfo} postShareObject={postShareObject} updateShareInfo={share => setShareInfo(share)}/>
      </div>
      
    </div>  
    );
};

export default AddShareContainer;
