import cn                     from "classnames";
import React                  from 'react'
import {connect, useDispatch} from "react-redux";
import {toggleMenu}           from "../../redux/appReducer";
import {logout}               from "../../redux/authReducer";
import styles                 from './Sidebar.module.scss'
import {NavLink}              from 'react-router-dom'
import logoutIcon             from '../../assets/img/logout-icon.png'
import {MdClose}              from "react-icons/md";
import {AppState}             from "../../redux/store";
import {bindActionCreators}   from "redux";
import {AppActions}           from "../../types/common_types";
import {ThunkDispatch}        from "redux-thunk";

interface SidebarProps {

}
type Props = SidebarProps & LinkStateProps & LinkDispatchProps;

const Sidebar: React.FC<Props> = ({logout, menuOpen}) => {
   const dispatch = useDispatch()

   const logoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

interface LinkStateProps {
   menuOpen: boolean
}

interface LinkDispatchProps {
   logout: () => void
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      menuOpen: state.common.menuOpen
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>,
   ownProps: SidebarProps
): LinkDispatchProps => ({
   logout: bindActionCreators(logout, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);


