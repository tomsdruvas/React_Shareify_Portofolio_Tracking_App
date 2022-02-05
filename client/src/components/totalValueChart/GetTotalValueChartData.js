import React, {useEffect, useState} from 'react';
import TotalValueChartDesign from './TotalValueChartDesign';
import { getShares } from '../../SharesService';
import { render } from "react-dom";
import './TotalValueChartDesign.css'


const TotalValueChart = ({shares}) => {
    const [totalShareData, setTotalShareData] = useState([])
    const [loading, setLoading] = useState(true)

    const getTotalValueDB = (shares) => {
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
        const getDataForShare = (symbol) => {
            const sharesApiURL = `https://api-dot-shareify-340417.nw.r.appspot.com/api/sharesData/find/${symbol}`
        return fetch(sharesApiURL)
        .then(respose => respose.json())
        .then((data) => 
            convertDataForChart(data["data"]))
        }

        let totalValueArr = []
        shares.map((share, index) => {
            let data = getDataForShare(share.symbol).then((data) => {
                

                    for (let i = 0; i < data.length; i++){
                        data[i][4] *= share.noOfShares
                        if (index===0) {
                            totalValueArr.push(data[i])
                        }
                        else {
                            totalValueArr[i][4]+=data[i][4]
                        }  
                        
                    }
                
            }) 
            
            
        })
        return totalValueArr
    }
    console.log(getTotalValueDB(shares))
    
    // useEffect(() => {
    //     getTotalValueDB(shares)
    // }, [])



    
    // useEffect(() => {
    //     getTotalShareData("TotalValue").then((result) => setTotalShareData(result))}
    //     , []);

    const chartFunc = () => {
            if (loading) {
                return <h2>Page is still loading, please wait</h2>
            }
            return <div id="total_value_chart"> <TotalValueChartDesign shares={shares} passShareData={(shares) => {getTotalValueDB(shares)}} totalShareData={totalShareData}/></div>
            }


  return <>
  {chartFunc()}
  </>
  
};

export default TotalValueChart;
