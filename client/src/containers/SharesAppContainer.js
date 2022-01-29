import React, {useState} from 'react';
import SharesGrid from '../components/SharesGrid';
import '../App.css';
import '../components/totalValueChart/TotalValueChartDesign.css'
import TotalValueChart from "../components/totalValueChart/TotalValueChart";
import CurrentValuePortfolioChart from "../components/CurrentValuePortfolioChart";
import TotalValue from '../components/TotalValue';
import ShareDetails from '../components/ShareDetails';


const SharesAppContainer = ({removeShareFromDB, shares, updateShareNo, totalShareData, loading}) => {
  const [shareData, setShareData] = useState([])
  const [chartHeadline, setChartHeadline] = useState("")
  const [showCorrectGraph, setShowCorrectGraph] = useState("Total")



  const getShareData = async (symbol) => {
    
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
    const sharesApiURL = `http://localhost:5000/api/sharesData/find/${symbol}`
    return fetch(sharesApiURL)
    .then(respose => respose.json())
    .then((data) => 
        convertDataForChart(data["data"]))
    .catch(err=>console.log(err))
    
    
    
}

    const graphRender = (symbol) => {
      setChartHeadline(symbol)
      getShareData(symbol).then((result) => setShareData(result))
    }

    const renderCorrectChart = () => {
      if (loading){
        return <h2>Chart is still loading, please wait</h2>
      } else{
      if (showCorrectGraph === "Total"){
        return (<TotalValueChart shares={shares} totalShareData={totalShareData} />)
      }
      else if (showCorrectGraph === "Individual") {
        return (<ShareDetails shareData={shareData} chartHeadline={chartHeadline}  />)
      }}
    }



  return <div className="container">

        <div  className="column">

          <TotalValue chartType={(value) =>setShowCorrectGraph(value)} shares={shares} className="top-left"/>
          <SharesGrid chartType={(value) =>setShowCorrectGraph(value)} getGraph={(symbol) => graphRender(symbol)} className="bottom" removeShareFromDB={removeShareFromDB} updateShareNo={updateShareNo} shares={shares}/>
        </div>
        <div  className="column">

    <div className="top-right"/>
    <div className = "charts">
    
    {renderCorrectChart()}
    <br />
    <br />
    <CurrentValuePortfolioChart className="bottom" shares={shares}/> 
    </div>
        </div>

  </div>


};

export default SharesAppContainer;
