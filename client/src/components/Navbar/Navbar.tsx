import React         from 'react';
import {useDispatch} from "react-redux";
import {toggleMenu}  from "../../redux/appReducer";
import styles        from './Navbar.module.scss'
import {MdMenu}      from "react-icons/md";


export const Navbar: React.FC = () => {
   /*const {} = useSelector((state: AppState) => ({
   }))*/
   const dispatch = useDispatch()

   const openMenu = (e: React.MouseEvent<SVGElement, MouseEvent>): void => {
      e.preventDefault();
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

