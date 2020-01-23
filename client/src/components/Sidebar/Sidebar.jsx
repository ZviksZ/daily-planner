import React     from 'react';
import styles    from './Sidebar.module.scss'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
   return (
      <div className={styles.wrapper}>
         <h1>Daily planner</h1>

         <nav>
            <NavLink to='/' 
                     exact
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

         <a href="/" className={styles.exitBtn}>
            Выход
         </a>
         
      </div>
   );
};

export default Sidebar;


