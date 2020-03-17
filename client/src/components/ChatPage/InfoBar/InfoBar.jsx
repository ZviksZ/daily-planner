import React      from 'react'
import {NavLink}  from "react-router-dom";
import closeIcon  from '../../../assets/img/closeIcon.png'
import onlineIcon from '../../../assets/img/onlineIcon.png'

import './InfoBar.scss'

const InfoBar = ({room, users, closeChat}) => (
   <div className="infoBar">
      <div className="leftInnerContainer">
         <img className="onlineIcon" src={onlineIcon} alt="online"/>
         <span>{users && users.length}</span>
         <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer" onClick={closeChat}><img src={closeIcon} alt="close"/></div>


   </div>
)

export default InfoBar
