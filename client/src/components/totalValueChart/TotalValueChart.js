import React, {useEffect, useState} from 'react';
import TotalValueChartDesign from './TotalValueChartDesign';
import { getShares } from '../../SharesService';
import { render } from "react-dom";
import './TotalValueChartDesign.css'



const TotalValueChart = ({shares}) => {
    const [totalShareData, setTotalShareData] = useState([])
    const [loading, setLoading] = useState(true)


    const convertDataForChart = (inputData) => {
        let sharesDataArr = []
              for (let key in inputData) {
          
                if (inputData.hasOwnProperty(key)) {
                    let prices = Object.values(inputData[key])
                    prices = prices.map(Number)
                    sharesDataArr.push([parseInt((new Date(key).getTime()).toFixed(0))].concat(prices))
                }
                  
              }
      return sharesDataArr.reverse()
    }

    const getDataForShare = async (symbol) => {
        const sharesApiURL = `http://localhost:5000/api/sharesData/find/${symbol}`
    const respose = await fetch(sharesApiURL);
        const data = await respose.json();
        return convertDataForChart(data["data"]);
    }
    
    const getTotalValueDB = async (shares) => {
        
        let totalValueArr = []
        await Promise.all(
        shares.map(async (share, index) => {
            return getDataForShare(share.symbol).then((data) => {
            for (let i = 0; i < data.length; i++) {
                data[i][4] *= share.noOfShares;
                if (index === 0) {
                    totalValueArr.push(data[i]);
                }
                else {
                    totalValueArr[i][4] += data[i][4];
                }

            } 
        }).catch(err => console.log('There was an error:' + err))
        
    }))
        setLoading(false)
        console.log("Shares" + shares)
        // console.log("Data" + totalValueArr)
        setTotalShareData(totalValueArr)
    
    }
    
    useEffect(() => {
        getTotal()
       },[shares]);
     
    const getTotal = () => {
        getTotalValueDB(shares)
    }

    const chartFunc = () => {
            if (loading) {
                return <h2>Page is still loading, please wait</h2>
            }
            return <div id="total_value_chart"> <TotalValueChartDesign totalShareData={totalShareData}/></div>
            }


  return <>
  {chartFunc()}
  </>
  
};

export default TotalValueChart;
