import React      from 'react';
import {connect}  from "react-redux";
import styles     from './GlobalError.module.scss'
import {AppState} from "../../../redux/store";

type Props = LinkStateProps;

const GlobalError: React.FC<Props> = ({globalError}) => {
   return (
      <>
         {globalError && <div className={styles.globalError}>
            <div className={styles.message}>{globalError}</div>
         </div>}
      </>
   );
}
interface LinkStateProps {
   globalError: string
}
let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      globalError: state.common.globalError,
   }
}

export default connect(mapStateToProps, {})(GlobalError)
