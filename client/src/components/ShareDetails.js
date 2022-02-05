import React from 'react';
import ChartDesign from './ChartDesign';
import "./totalValueChart/TotalValueChartDesign.css"





const ShareDetails = ({shareData, chartHeadline}) => {

    

    
   


  return (
        <><div>
        <br />
        <ChartDesign selectedShare={chartHeadline} shareData={shareData}/>
        </div>
        </>)
};

export default ShareDetails
