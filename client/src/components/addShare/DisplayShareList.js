import React from 'react';
import DisplayShare from './DisplayShare';
import './AddShare.css'

const DisplayShareList = ({shareSearchArray, getInfo, updateShareInfo, clearArray}) => {

   const displayShareList = shareSearchArray.map(share => <DisplayShare getInfo={getInfo} share={share} updateShareInfo={updateShareInfo} key={share['1. symbol']} />);

   const infoSentence = shareSearchArray.length !== 0 ? "Select a share to add to portfolio:" : ""

   const handleClick = () => {
    clearArray([])
   }
    
  return (
    <div className='display-share-list-container'>
        <h3>Search Results:</h3>
        <p>{infoSentence}</p>
        <ul className="display-list"> 
            {displayShareList}
        </ul>
        <div className='clear-list'>
            <button onClick={handleClick}>Clear List</button>
        </div>
    </div>
    );
};

export default DisplayShareList;
