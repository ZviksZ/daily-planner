import React, {useEffect}                               from 'react';
import {bindActionCreators}                             from "redux";
import {ThunkDispatch}                                  from "redux-thunk";
import {AppActions}                                     from "../../types/common_types";
import styles                                           from './EnglishPage.module.scss'
import {connect}                                        from "react-redux";
import {addWordToDictionary, deleteWord, getDictionary} from "../../redux/englishReducer";
import AddItemForm                                      from "../common/AddItemForm/AddItemForm";
import EnglishPageItem                                  from "./EnglishPageItem";
import {IEnglishItem}                                   from "../../types/english_types";
import {AppState}                                       from "../../redux/store";

type Props = LinkStateProps & LinkDispatchProps;


const EnglishPage: React.FC<Props> = ({dictionary, addWordToDictionary, getDictionary, deleteWord}) => {
   useEffect(() => {
      getDictionary()
   }, [getDictionary])
   return (
      <div className="page-section">
         <h3>Мой словарь</h3>
         <AddItemForm placeholder={'Введите слово на английском языке'}
                      onSend={addWordToDictionary}/>
         <table className={styles.dictionaryTable}>
            <thead>
            <tr>
               <th>Английский</th>
               <th>Русский</th>
               <th></th>
            </tr>
            </thead>
            <tbody>
            {
               dictionary && dictionary.map(word => <EnglishPageItem key={word._id} word={word} deleteWord={deleteWord}/>)
            }
            </tbody>
         </table>

      </div>
   );
}

interface LinkStateProps {
   dictionary: IEnglishItem[]
}

interface LinkDispatchProps {
   addWordToDictionary: (word: string) => void
   getDictionary: () => void
   deleteWord: (id: string) => void
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      dictionary: state.englishPage.dictionary
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   addWordToDictionary: bindActionCreators(addWordToDictionary, dispatch),
   getDictionary: bindActionCreators(getDictionary, dispatch),
   deleteWord: bindActionCreators(deleteWord, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(EnglishPage)

