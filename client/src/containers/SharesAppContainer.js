import React, {useState} from 'react';
import SharesGrid from '../components/SharesGrid';
import '../App.css';
import '../components/totalValueChart/TotalValueChartDesign.css'
import TotalValueChart from "../components/totalValueChart/TotalValueChart";
import CurrentValuePortfolioChart from "../components/CurrentValuePortfolioChart";
import TotalValue from '../components/TotalValue';
import ShareDetails from '../components/ShareDetails';
import AddShareContainer from './AddShareContainer';
import NavBar from "../components/NavBar";
import Calculator from '../components/calculator/Calculator';
import { getShareData } from '../SharesService';



const SharesAppContainer = ({removeShareFromDB, apiKey, shares, updateShareNo, totalShareData, loading, addNewShare, removeShare}) => {
  const [shareData, setShareData] = useState([])
  const [chartHeadline, setChartHeadline] = useState("")
  const [showCorrectGraph, setShowCorrectGraph] = useState("Total")







    const graphRender = (share) => {
      setChartHeadline(share.symbol)
      // getShareData(share).then((result) => setShareData(result))
      setShareData(share.data)
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
      }
      else if (showCorrectGraph === "Add_share") {
        return (<AddShareContainer apiKey={apiKey} postShareObject={newShare => addNewShare(newShare)} shares={shares} removeShareFromDB={id => removeShare(id) }/>)
      }
      else if (showCorrectGraph === "Calc"){
        return (<Calculator/>)
      }}
    }


  return (<>
  <NavBar chartType={(value) => setShowCorrectGraph(value)} className = "navbar"/>
  <div className="container">

        <div  className="column">

          <TotalValue chartType={(value) =>setShowCorrectGraph(value)} shares={shares} className="top-left"/>
          <SharesGrid chartType={(value) =>setShowCorrectGraph(value)} getGraph={(share) => graphRender(share)} className="bottom" removeShareFromDB={removeShareFromDB} updateShareNo={updateShareNo} shares={shares}/>
        </div>
        <div  className="column">

    
    <div className = "charts">
    
    {renderCorrectChart()}
    <br />
    <br />
    
    <CurrentValuePortfolioChart className="bottom" shares={shares}/> 
  
    </div>
  </div>

</div>

  </>)
};

export default SharesAppContainer;
