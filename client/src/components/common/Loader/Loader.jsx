import React  from 'react';
import styles from './Loader.module.scss'


const Loader = (props) => {
   return (
      <div className={styles.loader}>
         <span />
         <span />
         <span />
         <span />
      </div>
   );
}

export default Loader;