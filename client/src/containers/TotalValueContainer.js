import React, { useState, useEffect } from "react";
import TotalValue from "../components/TotalValue";
import CurrentValuePortfolioChart from "../components/CurrentValuePortfolioChart";
import { getShares } from "../SharesService";
// import getApiKey from "../../key";

const TotalValueContainer = ({shares}) => {
  // const [sharePrice, setSharePrice] = useState([]);
  // const [shareObjects, setShareObjects] = useState([]);

 

  // //getting the shareObjects
  // useEffect(() => {
  //   getShares().then((data) => setShareObjects(data));
  // }, []);






  return (
    <div>
      <hr />
      <div>
        <TotalValue shares={shares}/>
        {/* <CurrentValuePortfolioChart shares={shares} /> */}
      </div>
    </div>
  );
};

export default TotalValueContainer;
