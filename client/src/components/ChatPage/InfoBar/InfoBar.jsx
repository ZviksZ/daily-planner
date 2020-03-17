import React      from 'react'
import {NavLink}  from "react-router-dom";
import closeIcon  from '../../../assets/img/closeIcon.png'
import onlineIcon from '../../../assets/img/onlineIcon.png'

import './InfoBar.scss'

const InfoBar = ({room}) => (
   <div className="infoBar">
      <div className="leftInnerContainer">
         <img className="onlineIcon" src={onlineIcon} alt="online"/>
         <h3>{room}</h3>
      </div>
     {/* <div className="rightInnerContainer">

         <NavLink to='/todo'><img src={closeIcon} alt="close"/></NavLink>
      </div>*/}

   </div>
)

export default InfoBar
