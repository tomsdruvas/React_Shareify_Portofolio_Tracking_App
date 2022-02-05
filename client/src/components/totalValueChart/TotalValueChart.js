import React, {useEffect, useState} from 'react';
import TotalValueChartDesign from './TotalValueChartDesign';
import './TotalValueChartDesign.css'



const TotalValueChart = ({shares}) => {
    const [totalShareData, setTotalShareData] = useState([])
    const [loading, setLoading] = useState(true)

    const getDataForShare = async (share) => {
        const sharesApiURL = `https://api-dot-shareify-340417.nw.r.appspot.com/api/sharesData/find/${share.symbol}`
    const respose = await fetch(sharesApiURL);
        const data = await respose.json();
        let info = data["data"]
        for (let i = 0; i < info.length; i++){
            info[i][4] *= share.noOfShares
        }
        return info
        
    }
    
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
