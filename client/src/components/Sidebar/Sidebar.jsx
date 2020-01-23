import React     from 'react';
import styles    from './Sidebar.module.scss'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
   return (
      <div className={styles.wrapper}>
         <h1>Title</h1>

         <nav>
            <NavLink to={'/'}>11</NavLink>
         </nav>
      </div>
   );
};

export default Sidebar;


