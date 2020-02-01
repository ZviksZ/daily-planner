import React, {useContext}   from 'react'
import styles                from './Sidebar.module.scss'
import {NavLink, useHistory} from 'react-router-dom'
import logoutIcon from '../../assets/img/logout-icon.png'

const Sidebar = () => {
   const history = useHistory()
   /*const {logout} = useContext(AuthContext)*/

   const logoutHandler = (e) => {
      e.preventDefault()
      /*logout()*/
      history.push('/')
   }
   
   return (
      <div className={styles.wrapper}>
         <h1>Daily planner</h1>

         <nav>
            <NavLink to='/todo'                      
                     className={styles.links} 
                     activeClassName={styles.activeLink}>Список дел</NavLink>
            <NavLink to='/videos' 
                     className={styles.links} 
                     activeClassName={styles.activeLink}>Видео для обучения</NavLink>
            <NavLink to='/features' 
                     className={styles.links} 
                     activeClassName={styles.activeLink}>Полезности</NavLink>
            <NavLink to='/patterns' 
                     className={styles.links} 
                     activeClassName={styles.activeLink}>Паттерны и лучшие практики</NavLink>
            <NavLink to='/semantic' 
                     className={styles.links} 
                     activeClassName={styles.activeLink}>Семантика html,css,js</NavLink>
            <NavLink to='/projects' 
                     className={styles.links}
                     activeClassName={styles.activeLink}>Мои проекты</NavLink>
            <NavLink to='/english' 
                     className={styles.links} 
                     activeClassName={styles.activeLink}>Изучение английского</NavLink>
         </nav>

         <a href="/" className={styles.exitBtn} onClick={logoutHandler}>
            <img src={logoutIcon} alt="logout"/>
            <span>Выход</span>
         </a>
         
      </div>
   );
};

export default Sidebar;


