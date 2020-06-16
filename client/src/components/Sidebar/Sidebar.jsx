import cn                     from "classnames";
import React, {useState}      from 'react'
import {connect, useDispatch} from "react-redux";
import {toggleMenu}           from "../../redux/appReducer.js";
import {logout}               from "../../redux/authReducer.js";
import styles                 from './Sidebar.module.scss'
import {NavLink}              from 'react-router-dom'
import logoutIcon             from '../../assets/img/logout-icon.png'

import {MdMenu}  from "react-icons/md";
import {MdClose} from "react-icons/md";

const Sidebar = ({logout,menuOpen}) => {
   const dispatch = useDispatch()

   const logoutHandler = (e) => {
      e.preventDefault()
      logout()
   }

   const closeMenu = () => {
      dispatch(toggleMenu(false))
   }


   return (
      <div className={cn({[styles.openWrapper]: menuOpen}, styles.wrapper)}>
         <div className={styles.closeBtnWrap}>
            <MdClose onClick={closeMenu}
                     className={styles.burgerBtn}
                     size={'2.8rem'}/>
         </div>

         <div className={styles.sidebarNav}>
            <nav>
               <NavLink to='/todo'
                        onClick={closeMenu}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Список дел</NavLink>
               <NavLink to='/videos'
                        onClick={closeMenu}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Видео для обучения</NavLink>
               <NavLink to='/patterns'
                        onClick={closeMenu}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Паттерны и лучшие практики</NavLink>
               <NavLink to='/projects'
                        onClick={closeMenu}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Мои проекты</NavLink>
               <NavLink to='/english'
                        onClick={closeMenu}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Изучение английского</NavLink>
            </nav>

            <a href="/" className={styles.exitBtn} onClick={logoutHandler}>
               <img src={logoutIcon} alt="logout"/>
               <span>Выход</span>
            </a>
         </div>

      </div>
   );
};

let mapStateToProps = (state) => {
   return {
      menuOpen: state.common.menuOpen
   }
}

export default connect(mapStateToProps, {logout})(Sidebar);


