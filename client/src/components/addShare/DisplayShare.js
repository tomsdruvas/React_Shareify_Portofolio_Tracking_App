import React from 'react';

const DisplayShare = ({share, getInfo, updateShareInfo}) => {

    const handleClick = () => {
        getInfo(share['1. symbol']);
        updateShareInfo(share);
    };
    
    return (
        <li>
            <span className='white redHover' onClick={handleClick}>{share['2. name']} &nbsp; {share['4. region']} &nbsp;  {share['1. symbol']}</span>
       </li>
    );
};

export default DisplayShare;
