import React, {useEffect}                               from 'react';
import styles                                           from './EnglishPage.module.scss'
import {connect}                                        from "react-redux";
import {addWordToDictionary, deleteWord, getDictionary} from "../../redux/englishReducer.ts";
import AddItemForm                                      from "../common/AddItemForm/AddItemForm.tsx";
import EnglishPageItem                                  from "./EnglishPageItem.jsx";

const EnglishPage = ({dictionary, addWordToDictionary, getDictionary, deleteWord}) => {
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

let mapStateToProps = (state) => {
   return {
      dictionary: state.englishPage.dictionary
   }
}

export default connect(mapStateToProps,
   {addWordToDictionary, getDictionary, deleteWord})(EnglishPage)

