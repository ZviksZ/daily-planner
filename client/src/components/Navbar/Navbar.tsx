import React                      from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu}               from "../../redux/appReducer.js";
import styles                     from './Navbar.module.scss'
import {MdMenu}                   from "react-icons/md";
import {MdClose}                  from "react-icons/md";


export const Navbar: React.FC = () => {
   const {} = useSelector(state => ({
   }))
   const dispatch = useDispatch()

   const openMenu = () => {
      dispatch(toggleMenu(true))
   }

   return (
      <div className={styles.navbar}>
         <MdMenu className={styles.burgerBtn}
                 onClick={openMenu}
                 size={'2.8rem'}/>


         <h1>Daily planner</h1>
      </div>
   );
}

