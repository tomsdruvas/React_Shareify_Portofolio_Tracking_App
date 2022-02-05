import React from 'react';
import CurrentPosition from './CurrentPosition';

const CurrentPositionGrid = ({shares, removeShareFromDB}) => {

    const sharesList = shares.map(share => {
        return <CurrentPosition share={share} key={share._id} removeShareFromDB={removeShareFromDB}/>
    })

    const noOfShare = shares.map((s) => s.noOfShares);
    const currentPrice = shares.map((s) => s.currentPrice);
    const totalValue = noOfShare.reduce(function (r, a, i) {
    return r + a * currentPrice[i];
  }, 0);

  return (
      <>        
        <div className="big-red">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total: £{totalValue.toLocaleString()}</p>
        </div>
        <ul className="display-list">
        {sharesList}
        </ul>
      </>
  )
};

export default CurrentPositionGrid;