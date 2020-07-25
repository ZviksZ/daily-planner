import React, {useEffect, useState}                                          from 'react';
import {connect}                                                             from "react-redux";
import {createPattern, deletePattern, getPatterns, setSearch, updatePattern} from "../../redux/patternReducer";
import {getFilteredPatterns}                                                 from "../../redux/selectors/patternSelectors";
import AddItemForm                                                           from "../common/AddItemForm/AddItemForm";
import Loader                                                                from "../common/Loader/Loader";
import SearchAndFilter                                                       from "../common/SearchAndFilter/SearchAndFilter";
import PatternsList                                                          from "./PatternsList/PatternsList";
import styles                                                                from './PatternsPage.module.scss'
import {AppState}                                                            from "../../redux/store";
import {ThunkDispatch}                                                       from "redux-thunk";
import {AppActions}                                                          from "../../types/common_types";
import {bindActionCreators}                                                  from "redux";
import {IPattern}                                                            from "../../types/pattern_types";


type Props = LinkStateProps & LinkDispatchProps;

const PatternsPage: React.FC<Props> = ({loading, patterns, getPatterns, createPattern, deletePattern, updatePattern, setSearch}) => {
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


interface LinkStateProps {
   loading: boolean
   patterns: IPattern[]
}

interface LinkDispatchProps {
   getPatterns: () => void
   createPattern: (title: string, description?: string) => void
   deletePattern: (patternId: string) => void
   updatePattern: (patternId: string, title: string, description: string) => void
   setSearch: (search: string) => void
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      loading: state.common.loading,
      patterns: getFilteredPatterns(state)
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   getPatterns: bindActionCreators(getPatterns, dispatch),
   createPattern: bindActionCreators(createPattern, dispatch),
   deletePattern: bindActionCreators(deletePattern, dispatch),
   updatePattern: bindActionCreators(updatePattern, dispatch),
   setSearch: bindActionCreators(setSearch, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PatternsPage)

