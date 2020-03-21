import cn                    from "classnames";
import React, {useState}     from 'react'
import {connect}             from "react-redux";
import {logout}              from "../../redux/authReducer.js";
import styles                from './Sidebar.module.scss'
import {NavLink, useHistory} from 'react-router-dom'
import logoutIcon            from '../../assets/img/logout-icon.png'

import {MdMenu}  from "react-icons/md";
import {MdClose} from "react-icons/md";

const Sidebar = ({logout, userId, email}) => {

   const history = useHistory();
   const [burgerMode, setBurgerMode] = useState(false);

   const logoutHandler = (e) => {
      e.preventDefault()
      logout()
      //history.push('/')


   }

   const toggleMenu = () => {
      setBurgerMode(!burgerMode);
   }


   return (
      <div className={styles.wrapper}>
         <h1>Daily planner</h1>
         <div className={cn({[styles.sidebarOpen]: burgerMode}, styles.sidebarNav)}>
            <nav>
               <NavLink to='/todo'
                        onClick={() => setBurgerMode(false)}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Список дел</NavLink>
               <NavLink to='/videos'
                        onClick={() => setBurgerMode(false)}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Видео для обучения</NavLink>
               <NavLink to='/patterns'
                        onClick={() => setBurgerMode(false)}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Паттерны и лучшие практики</NavLink>
               <NavLink to='/projects'
                        onClick={() => setBurgerMode(false)}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Мои проекты</NavLink>
               <NavLink to='/english'
                        onClick={() => setBurgerMode(false)}
                        className={styles.links}
                        activeClassName={styles.activeLink}>Изучение английского</NavLink>
            </nav>

            <a href="/" className={styles.exitBtn} onClick={logoutHandler}>
               <img src={logoutIcon} alt="logout"/>
               <span>Выход</span>
            </a>

            <MdClose onClick={() => setBurgerMode(false)}
                     className={styles.burgerBtn}
                     size={'2.8rem'}/>
         </div>


         <div className={styles.sidebar_burger} onClick={toggleMenu}>
            <MdMenu onClick={() => setBurgerMode(true)}
                                     className={styles.burgerBtn}
                                     size={'2.8rem'}/>
         </div>

      </div>
   );
};

let mapStateToProps = (state) => {
   return {
      userId: state.authPage.userId,
      email: state.authPage.email
   }
}

export default connect(mapStateToProps, {logout})(Sidebar);


