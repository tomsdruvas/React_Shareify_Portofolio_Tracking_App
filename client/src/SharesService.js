
// const baseURL = 'http://localhost:5000/api/shares/'
// const baseURLData = 'http://localhost:5000/api/sharesData'

const baseURL = 'http://shareify-app.heroku.com/api/shares'
const baseURLData = 'https://shareify-app.heroku.com/api/sharesData'





// import getDbFunc from "./getDbFunc"
// const dbURL = getDbFunc()
// const baseURL = `${dbURL}/api/shares/`
// const baseURLData = `${dbURL}/api/sharesData/`

export const getShares = async () => {
    const res = await fetch(baseURL)
    return await res.json()
}





export const postShare = async (payload) => {
    const res = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    return await res.json()
}


export const postShareData = async (payload) => {
    const res = await fetch(baseURLData, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    return await res.json()
}


export const deleteShare = (id) => {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}

export const getShare = async (id) => {
  const res = await fetch(baseURL + id)
    return await res.json()
}

export const updateShare = (id, payload) => {
    return fetch(baseURL + id, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    // .then(res => res.json())
}

// export const convertDataForChart = (inputData) => {
//     let sharesDataArr = []
//           for (let key in inputData) {
      
//             if (inputData.hasOwnProperty(key)) {
//                 let prices = Object.values(inputData[key])
//                 prices = prices.map(Number)
//                 sharesDataArr.push([parseInt((new Date(key).getTime()).toFixed(0))].concat(prices))
//             }
              
//           }
//   return sharesDataArr.reverse()
// }

// export const getDataForShare = async (symbol) => {
//     const sharesApiURL = `http://localhost:5000/api/sharesData/find/${symbol}`
// const respose = await fetch(sharesApiURL);
//     const data = await respose.json();
//     return convertDataForChart(data["data"]);
// }

// export const getTotalValueDB = async (shares) => {
//     let totalValueArr = []
//     let promises = shares.map(async (share, index) => {
//         return getDataForShare(share.symbol).then((data) => {
//         for (let i = 0; i < data.length; i++) {
//             data[i][4] *= share.noOfShares;
//             if (index === 0) {
//                 totalValueArr.push(data[i]);
//             }
//             else {
//                 totalValueArr[i][4] += data[i][4];
//             }

//         } 
//     }).catch(err=>console.log(err))
// })
// return totalValueArr 
// }


