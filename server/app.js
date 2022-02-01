const assert = require('assert');
const nodeCron = require("node-cron");
const puppeteer = require("puppeteer");
// const ora = require("ora");
const chalk = require("chalk");
const fetch = require("node-fetch");
const { default: getApiKey } = require("./key");
const { ObjectId } = require('mongodb')
const MongoClient = require("mongodb").MongoClient
const express = require('express');
const createRouter = require('./helpers/create_router.js')

const urlLocal = "http://localhost:5000/api/shares/";
const urlApi = (symbol) => {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${getApiKey}`
}


// const urlDb = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient.connect(urlDb)
// const db = client.db("sharesApp")
// const sharesCollection = db.collection('shares');



/////

// async function main(){
//     const uri = 'mongodb://127.0.0.1:27017';
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);

//         await findAllShares(client, {
            
//         });
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);



// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// async function findAllShares(client, {} = {}) {
//     const cursor = client.db("sharesApp").collection("shares").find(
//                             {
//                             }
//                             ).sort({ name: -1 });

//     const results = await cursor.toArray();

//     if (results.length > 0) {
//         console.log(`Found shares`);
//         results.forEach((result, i) => {
            

//             console.log();
//             console.log(`${i + 1}. name: ${result.name}`);
//             console.log(`   _id: ${result._id}`);
//             console.log(`   price: ${result.currentPrice}`);
//             console.log(`   Number of shares: ${result.noOfShares}`);
//         });
//     } else {
//         console.log(`No shares found`);
//     }
// }





/////

async function updateAPI() {
    const getShares = async () => {
            console.log("Getting all the shares", new Date().toLocaleString(), "-----------------------------")
            const res = await fetch(urlLocal)
            
            
            return await res.json()
        }
        getShares().then((data) => {
            console.log(data)
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