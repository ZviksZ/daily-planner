import React, {useEffect, useState}                                          from 'react';
import {connect}                                                             from "react-redux";
import {createPattern, deletePattern, getPatterns, setSearch, updatePattern} from "../../redux/patternReducer.ts";
import {getFilteredPatterns}                                                 from "../../redux/selectors/patternSelectors.js";
import AddItemForm                                                           from "../common/AddItemForm/AddItemForm.jsx";
import Loader                                                                from "../common/Loader/Loader.jsx";
import SearchAndFilter                                                       from "../common/SearchAndFilter/SearchAndFilter.jsx";
import PatternsList                                                          from "./PatternsList/PatternsList.jsx";
import styles                                                                from './PatternsPage.module.scss'

const PatternsPage = ({loading, patterns, getPatterns, createPattern, deletePattern, updatePattern, setSearch}) => {
   const [addMode, setAddMode] = useState(false)

   useEffect(() => {
      getPatterns()
   }, [getPatterns])

   if (loading) {
      return <Loader/>
   }
   return (
      <div className="page-section">
         <h3>Паттерны и лучшие практики</h3>
         {
            addMode ? <button onClick={() => setAddMode(false)} className='btn-default mb-1'>Закрыть форму</button> : <button onClick={() => setAddMode(true)} className='btn-default'>Добавить</button>
         }
         {
            addMode && <AddItemForm onSend={createPattern}
                                    placeholder={'Введите ссылку полезный материал'}
                                    secondFieldPlaceholder={'Описание'}
                                    secondField={true}/>
         }



         <SearchAndFilter onSearch={setSearch} onlySearch={true}/>
         <div className={styles.patternsList}>
               <PatternsList updatePattern={updatePattern} deletePattern={deletePattern}
                             list={patterns} title={''}/>
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      loading: state.common.loading,
      patterns: getFilteredPatterns(state)
   }
}

export default connect(mapStateToProps, {getPatterns, createPattern, deletePattern, updatePattern, setSearch})(PatternsPage)

