import React, {useState}     from 'react'
import {connect}             from "react-redux";
import {logout}              from "../../redux/authReducer.js";
import styles                from './Sidebar.module.scss'
import {NavLink, useHistory} from 'react-router-dom'
import logoutIcon            from '../../assets/img/logout-icon.png'

const Sidebar = ({logout, userId, email}) => {

   const history = useHistory();
   const [burgerMode, setBurgerMode] = useState(false);

   const logoutHandler = (e) => {
      e.preventDefault()
      logout()
      history.push('/')
   }

   const toggleMenu = () => {
      setBurgerMode(!burgerMode);
   }

   return (
      <div className={styles.wrapper}>
         <h1>Daily planner</h1>
         {
            !burgerMode && <>
               <nav>
                  <NavLink to='/todo'
                           className={styles.links}
                           activeClassName={styles.activeLink}>Список дел</NavLink>
                  <NavLink to='/videos'
                           className={styles.links}
                           activeClassName={styles.activeLink}>Видео для обучения</NavLink>
                  <NavLink to='/patterns'
                           className={styles.links}
                           activeClassName={styles.activeLink}>Паттерны и лучшие практики</NavLink>
                  <NavLink to='/projects'
                           className={styles.links}
                           activeClassName={styles.activeLink}>Мои проекты</NavLink>
                  <NavLink to='/english'
                           className={styles.links}
                           activeClassName={styles.activeLink}>Изучение английского</NavLink>
                  <NavLink to={`/chat?name=${email}&room=daily_planner_room`}
                           className={styles.links}
                           activeClassName={styles.activeLink}>Чат</NavLink>
               </nav>

               <a href="/" className={styles.exitBtn} onClick={logoutHandler}>
                  <img src={logoutIcon} alt="logout"/>
                  <span>Выход</span>
               </a>
            </>
         }


         <div className="sidebar_burger" onClick={toggleMenu}>mode</div>

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


