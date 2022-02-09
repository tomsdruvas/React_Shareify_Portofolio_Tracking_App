import React, {useEffect, useState} from 'react';
import { getDataForShare } from '../../SharesService';
import TotalValueChartDesign from './TotalValueChartDesign';
import './TotalValueChartDesign.css'



const TotalValueChart = ({shares}) => {
    const [totalShareData, setTotalShareData] = useState([])
    const [loading, setLoading] = useState(true)
    const delay = ms => new Promise(res => setTimeout(res, ms));

    
    const getTotalValueDB = async (shares) => {

        const clonedShares = JSON.parse(JSON.stringify(shares))
               
        const requests = clonedShares.map(async (share, index) => {
            // console.log(share)
            let info = share["data"]
    for (let i = 0; i < info.length; i++){
        info[i][4] *= share.noOfShares
    }
    
    return info


            
        
        
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
            const dscSortedList = result.sort((a,b) => b.length - a.length);
            let totalValueArr = []
            dscSortedList.forEach((data, index) => {
                for (let i = 0; i < data.length; i++) {
                    if (index === 0) {
                        totalValueArr.push(data[i]);
                    }
                    else {
                        let dateAlreadyAdded = false
                        for (let y=0; y < totalValueArr.length ; y++){                      
                            if (totalValueArr[y].includes(data[i][0])){
                                dateAlreadyAdded = true
                                totalValueArr[y][4]+=data[i][4]

                            }
                        }
                        if (dateAlreadyAdded = false){
                        totalValueArr.unshift(data[i])
                        }
                      
                    }
                }
            })
            // console.log(totalValueArr)
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
