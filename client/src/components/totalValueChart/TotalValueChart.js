import React, {useEffect, useState} from 'react';
import { getDataForShare } from '../../SharesService';
import TotalValueChartDesign from './TotalValueChartDesign';
import './TotalValueChartDesign.css'



const TotalValueChart = ({shares}) => {
    const [totalShareData, setTotalShareData] = useState([])
    const [loading, setLoading] = useState(true)
    const delay = ms => new Promise(res => setTimeout(res, ms));

    
    const getTotalValueDB = async (shares) => {
        
        const requests = shares.map(async (share, index) => {
            return getDataForShare(share).then((data) => {
                return data
            })


            
        
        
    })
        return Promise.all(requests)
    }

    
    useEffect(() => {
        getTotal()
        // below is an error disable statement, the code is tested and works correctly
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[shares]);

    
     
    const getTotal = () => {
        setLoading(true)
        getTotalValueDB(shares).then(result => 
            {
            let totalValueArr = []
            result.forEach((data, index) => {
                for (let i = 0; i < data.length; i++) {
                    if (index === 0) {
                        totalValueArr.push(data[i]);
                    }
                    else {
                        for (let y=0; y < totalValueArr.length; y++){
                            if (totalValueArr[y].includes(data[i][0])){
                                totalValueArr[y][4]+=data[i][4]

                            }
                        }
                        // if(totalValueArr[i][0] === data[i][0]){
                        // totalValueArr[i][4] += data[i][4]}
                        // else{
                        //     console.log("Error with time entries")
                        // }
                    }
                }
            })
            return totalValueArr
            })
            .then((result) => setTotalShareData(result),setLoading(false))
            .catch(err=>console.log(err))
    }

    const chartFunc = () => {
            if (loading || !totalShareData) {
                return <h2>Page is still loading, please wait</h2>
            }
            return <div id="total_value_chart"> <TotalValueChartDesign totalShareData={totalShareData}/></div>
            }


  return <>
  {chartFunc()}
  </>
  
};

export default TotalValueChart;
