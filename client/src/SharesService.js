import { ToastContainer, toast, Zoom } from 'react-toastify';

const baseURL = 'http://localhost:5000/api/shares/'
const baseURLData = 'http://localhost:5000/api/sharesData/'

// const baseURL = process.env.REACT_APP_LOCAL_SHARES
// const baseURLData = process.env.REACT_APP_LOCAL_SHARES_DATA

const delay = ms => new Promise(res => setTimeout(res, ms));
const toastText = (message, time) => {
    return (toast.success(message, {
        position: "bottom-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        }))
}

export const getShares = async () => {
    const res = await fetch(baseURL)
    if (res.status !== 200){
        toastText("API is loading", 3000)
        await delay(3000)
        const res2 = await fetch(baseURL)
        return await res2.json()
    }
    toastText("API is loading", 1000)
    await delay(1000)
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
    return fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
    })
}

export const getShare = async (id) => {
  const res = await fetch(`${baseURL}/${id}`)
    return await res.json()
}

export const updateShare = (id, payload) => {
    return fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    // .then(res => res.json())
}

export const getDataForShare = async (share) => {
    const sharesApiURL = `${baseURLData}find/${share.symbol}`
const respose = await fetch(sharesApiURL);
    const data = await respose.json();
    let info = data["data"]
    for (let i = 0; i < info.length; i++){
        info[i][4] *= share.noOfShares
    }
    return info
    
}



export const getShareData = async (share) => {
    const sharesApiURL = `${baseURLData}find/${share.symbol}`
    return fetch(sharesApiURL)
    .then(respose => respose.json())
    .then((data) => 
        data["data"])
    .catch(err=>console.log(err))
    
    
    
}


