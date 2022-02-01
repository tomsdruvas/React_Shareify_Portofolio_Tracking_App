import React, { useEffect, useState } from 'react';

const CalculatorForm = ({updateRate, updateGrowth, rate, growth}) => {

    const [principal, setprincipal] = useState("");

    const [returns, setReturns] = useState("");

    const [inflation, setInflation] = useState("");

    const [years, setYears] = useState("");

    const handlePrincipalChange = event => setprincipal(event.target.value);

    const handleReturnsChange = event => setReturns(event.target.value);

    const handleInflationChange = event => setInflation(event.target.value)

    const handleYearChange = event => setYears(event.target.value);

    useEffect(() => {
        updateRate((Number(returns) - Number(inflation))/100)
    },[inflation])

    const annualizedGrowth = (principal, rate, frequency, years) => principal * Math.pow(1 + rate / frequency, frequency * years)

    const display = growth > 0 ? <div className="calcResults">Based on a starting value of £{principal}, an assumed annual return of {returns}% and an assumed annual inflation rate of {inflation}% (giving a real rate of return of {rate*100}%) - then the final value could be worth £{(Math.round(growth*100)/100).toLocaleString()} in {years} years (in real terms).</div> : "";

    const handleOnSubmit = event => {

        event.preventDefault();

        updateGrowth(annualizedGrowth(Number(principal), Number(rate), 1, Number(years)));
    }

    const handleReset = () => {
        setprincipal("");
        setReturns("");
        setInflation("");
        setYears("");
        updateRate("");
        updateGrowth("");
    }

  return (
    <>
     <div className="container-box">
  <div className="add-container">
        <h2 className='calcHead'>Forecast Calculator</h2>
        <form className='calcForm' onSubmit={handleOnSubmit}>
            <label htmlFor="principal">Starting Value:</label><br/>
            <input type="number" id="principal" placeholder="Enter starting value £" onChange={handlePrincipalChange} value={principal} required/><br/><br/>
            <label htmlFor="returns">Assumed Annual Return: </label><br/>
            <input type="number" id="returns" placeholder="Enter return %" onChange={handleReturnsChange} value={returns} required/><br/><br/>
            <label htmlFor="inflation">Assumed Annual Inflation: </label><br/>
            <input type="number" id="inflation" placeholder="Enter inflation %" onChange={handleInflationChange} value={inflation} required/><br/><br/>
            <label htmlFor="years">Enter Timeframe (years): </label><br/>
            <input type="number" id="years" placeholder="Enter years" onChange={handleYearChange} value={years} required/><br/><br/>
            <input type="submit" value="Calculate"/> <br/><br/>
            <button type="button" onClick={handleReset}>Reset</button>
        {display}
        </form><br/>
    
        </div>
        </div>
    </>
  )
};

export default CalculatorForm;
