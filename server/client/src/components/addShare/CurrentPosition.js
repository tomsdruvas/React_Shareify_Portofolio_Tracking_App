import React from 'react';

const CurrentPosition = ({share, removeShareFromDB}) => {

    const handleDelete = () => removeShareFromDB(share._id);

  return (
      <li>
      <span className="big-red" >{share.name} ({share.symbol})</span>
      <br/> Amount owned: {share.noOfShares}
      <br/>Total value: £{(Number(share.noOfShares)*Number(share.currentPrice)).toLocaleString()}<br/>
      <button onClick={handleDelete}>Delete</button>
      </li>
      
  );
};

export default CurrentPosition;