import React, {useEffect, useState} from 'react';
import TotalValueChartDesign from './TotalValueChartDesign';
import { getShares, getDataForShare } from '../../SharesService';
import { render } from "react-dom";
import './TotalValueChartDesign.css'


const TotalValueChart = ({shares}) => {
    const [totalShareData, setTotalShareData] = useState([])
    const [loading, setLoading] = useState(true)

    const getTotalValueDB = (shares) => {
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
