import React     from 'react';
import {connect} from "react-redux";
import styles    from './GlobalError.module.scss'

const GlobalError = ({globalError}) => {
   return (
      <>
         {globalError && <div className={styles.globalError}>            
            <div className={styles.message}>{globalError}</div>
         </div>}
      </>
   );
}

let mapStateToProps = (state) => {
   return {
      globalError: state.common.globalError,
   }
}

export default connect(mapStateToProps, {})(GlobalError)
