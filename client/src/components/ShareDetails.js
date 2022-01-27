import React, {useState, useEffect} from 'react';
import getApiKey from '../key';
import { getShares } from '../SharesService';

//below are import needed for the chart
import ChartDesign from './ChartDesign';
import "./totalValueChart/TotalValueChartDesign.css"





const ShareDetails = ({selectedShare, shareData, chartHeadline}) => {
    const apiKey = getApiKey()
    const [shares, setShares] = useState([])
    // const [selectedShare, setSelectedShare] = useState("MSFT")
    // const [selectedTime, setSelectedTime] = useState ("DAILY")
    // const [shareData, setShareData] = useState([])
    // const [chartHeadline, setChartHeadline] = useState(selectedShare)
    // const [loading, setLoading] = useState(true)
    
    // const getShareData = async (symbol) => {
    //     setLoading(true)

    //     const convertDataForChart = (inputData) => {
    //         let sharesDataArr = []
    //               for (let key in inputData) {
              
    //                 if (inputData.hasOwnProperty(key)) {
    //                     let prices = Object.values(inputData[key])
    //                     prices = prices.map(Number)
    //                     sharesDataArr.push([parseInt((new Date(key).getTime()).toFixed(0))].concat(prices))
    //                 }
                      
    //               }
    //       return sharesDataArr.reverse()
    //     }

    //     // const timeFrameURL = () => {
    //     //     if (selectedTime === "DAILY") {
    //     //         return "Time Series (Daily)"
    //     //     }
    //     //     else if (selectedTime === "WEEKLY") {
    //     //         return "Weekly Time Series"
    //     //     }
    //     //     else if (selectedTime === "MONTHLY") {
    //     //         return "Monthly Time Series"
    //     //     }
    //     // }
    //     // const sharesApiURL = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeFrame}&symbol=${symbol}&apikey=${apiKey}`
    //     const sharesApiURL = `http://localhost:5000/api/sharesData/find/${symbol}`
    //     return fetch(sharesApiURL)
    //     .then(respose => respose.json())
    //     .then((data) => 
    //         convertDataForChart(data["data"]), setLoading(false))
    //     .catch(err=>console.log(err))
        
        
        
    // }
        
    
    // useEffect(() => {
    //     getShareData(selectedShare).then((result) => setShareData(result))}
    //     , []);
    
    // useEffect(() => {
    //     getShares().then((result) => setShares(result))
        
    // }, [])


    const sharesNodes = shares.map((share, index) => {
        return <option key={index} value={share.symbol}>{share.name}</option>

        
    })
    

    
    // const handleShareData = (event) => {
    //     event.preventDefault();
    //     setChartHeadline(selectedShare)
    //     getShareData(selectedShare).then((result) => setShareData(result))

    // }

    // const chartFunc = () => {
    // if (loading) {
    //     return <h2>Page is still loading, please wait</h2>
    // }
    // return (<div id="total_value_chart"><ChartDesign selectedShare={chartHeadline} shareData={shareData}/> </div>)
            
    // }


  return (
        <><div>
        {/* <form  onSubmit={handleShareData}>
        <label htmlFor="shares_drop_down">Choose a share:</label>
        <select id="shares_drop_down" onChange={onChange}>
        <option default disabled >Company</option>
                {sharesNodes}
        </select>
        <br />
        <input type="submit" value="Select" />
        </form> */}
        <br />
        <ChartDesign selectedShare={chartHeadline} shareData={shareData}/>
        </div>
        </>)
};

export default ShareDetails
