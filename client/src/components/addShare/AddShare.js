import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast, Zoom } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './AddShare.css';


const AddShare = ({symbolInfo, shareInfo, postShareObject, updateShareInfo}) => {

  const isArrayEmpty = Object.keys(shareInfo).length === 0 && shareInfo.constructor === Object;

  const display = isArrayEmpty ? "You've not chosen any shares to add yet" : `${shareInfo['2. name']}  (${symbolInfo['01. symbol']})  ${symbolInfo['05. price']}p` 

  const moreInfo = () => {

    if(!isArrayEmpty) {
      return <>
      <span data-tip data-for="moreInfo" className='info'><i className="fas fa-info-circle"></i></span>
      <ReactTooltip id="moreInfo">
        <span>Price: {symbolInfo['05. price']}p<br/> Open: {symbolInfo['02. open']}p<br/> High: {symbolInfo['03. high']}p<br/>Low: {symbolInfo['04. low']}p<br/>Volume: {symbolInfo['06. volume']}<br/>Latest trading day: {symbolInfo['07. latest trading day']}<br/>Previous close: {symbolInfo['08. previous close']}<br/>Change: {symbolInfo['09. change']}<br/>Change percent: {symbolInfo['10. change percent']}<br/>Type: {shareInfo['3. type']}<br/>Region: {shareInfo['4. region']}<br/>Currency{shareInfo['8. currency']}</span></ReactTooltip>
      </>
    }
  }

  const [noOfShares, setNoOfShares] = useState("");

  const handleOnChange = (event) => setNoOfShares(event.target.value);

  const handleOnSubmit = (event) => {

    event.preventDefault();

    if(!isArrayEmpty) {

      const shareObject = {
        name: shareInfo['2. name'],
        symbol: shareInfo['1. symbol'],
        noOfShares: Number(noOfShares),
        currentPrice: Number(symbolInfo['05. price'])
      } 

      postShareObject(shareObject);        
    }

    updateShareInfo({});
    
    setNoOfShares("");

    toast.success('Portfolio successfully updated!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <div className='add-share-container'>
      <div className='white display'>
        {display} &nbsp; {moreInfo()} 
      </div> 
      <form onSubmit={handleOnSubmit}> 
        <input type="number" min="1" placeholder='Enter number of shares' onChange={handleOnChange} value={noOfShares} required/><br/>
        <input type="submit" value="Add to portfolio"/>
        <ToastContainer theme="dark" transition={Zoom}/>
      </form>
    </div>
  );
};


export default AddShare;
