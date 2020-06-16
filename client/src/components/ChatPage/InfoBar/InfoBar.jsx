import React      from 'react'
import closeIcon  from '../../../assets/img/closeIcon.png'
import onlineIcon from '../../../assets/img/onlineIcon.png'

import './InfoBar.scss'

const InfoBar = ({room, users, closeChat}) => (
   <div className="infoBar">
      <div className="leftInnerContainer">
         <span><img className="onlineIcon" src={onlineIcon} alt="online"/>{users && users.length}</span>
         <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer" onClick={closeChat}><img src={closeIcon} alt="close"/></div>


   </div>
)

export default InfoBar