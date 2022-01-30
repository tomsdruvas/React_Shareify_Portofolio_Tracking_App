const nodeCron = require("node-cron");
const puppeteer = require("puppeteer");
// const ora = require("ora");
const chalk = require("chalk");
const fetch = require("node-fetch");
const { default: getApiKey } = require("./key");
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const createRouter = require('./helpers/create_router.js')

const urlLocal = "http://localhost:5000/api/shares/";
const urlApi = (symbol) => {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${getApiKey}`
}

const mongo = await MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
const db = mongo.db('sharesApp');
const collection = db.collection('shares');





async function updateAPI() {
    const getShares = async () => {
            console.log("Getting all the shares", new Date().toLocaleString(), "-----------------------------")
            const res = await fetch(urlLocal)
            
            return await res.json()
        }
        getShares().then((data) => {

            async function task(i, sharePrice) { // 3
                await timer(20000);
                console.log(`The old price of ${data[i].symbol} is ${data[i].currentPrice} and the new price is ${sharePrice}!`, new Date().toLocaleString());
              }
              
              async function main() {
                for(let i = 0; i < data.length; i++) {
                    const getDataForShare = async (share) => {
                        const sharesApiURL = urlApi(share)
                        const respose = await fetch(sharesApiURL);
                        const data = await respose.json();
                        let info = data["Time Series (5min)"]["2022-01-28 20:00:00"]["4. close"]
                        
                        return info
                        
                    }
                    console.log("Pause")
                    let newPrice = await getDataForShare(data[i].symbol)
                    await task(i, newPrice);
                    
                    
                }
                console.log("All tasks done")
              }
                  
              main();

            
        })
        
        
        
        // data.forEach((share) => {
        //     console.log(share.symbol)
            // console.log("Pause")
            // await timer(3000)
            // console.log("Start")
            
        // })
        
        
        function timer(ms) { return new Promise(res => setTimeout(res, ms)); }


    // async function task(i) { // 3
    //     await timer(3000);
    //     console.log(`Task ${i} done!`, new Date().toLocaleString());
    //   }
      
    //   async function main() {
    //     for(let i = 0; i < 100; i+= 10) {
    //       for(let j = 0; j < 10; j++) { // 1
            
    //           await task(i + j);
            
    //       }
    //     }
    //   }
          
    //   main();
      
      


        

}
// Schedule a job to run every two minutes
const job = nodeCron.schedule("1 * * * * *", updateAPI);