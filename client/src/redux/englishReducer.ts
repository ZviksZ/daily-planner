import {englishAPI}                                                                                                                                                from "../api/api";
import {getGlobalError}                                                                                                                                            from "./appReducer";
import {ADD_NEW_WORD, AddNewWordAction, DELETE_WORD, DeleteWordAction, EnglishActionTypes, EnglishInitialState, IEnglishItem, SET_DICTIONARY, SetDictionaryAction} from "../types/english_types";
import {Dispatch}                                                                                                                                                  from "redux";
import {AppActions}                                                                                                                                                from "../types/common_types";
import {AppState}                                                                                                                                                  from "./store";


let initialState: EnglishInitialState = {
   dictionary: [],
};

const englishReducer = (state = initialState, action: EnglishActionTypes) => {

   switch (action.type) {
      case SET_DICTIONARY: {
         return {
            ...state,
            dictionary: action.dictionary
         }
      }
      case ADD_NEW_WORD: {
         return {
            ...state,
            dictionary: [...state.dictionary, action.wordItem]
         }
      }
      case DELETE_WORD: {
         return {
            ...state,
            dictionary: state.dictionary.filter(word => word._id !== action.wordItemId)
         }
      }
      default:
         return state;
   }
}

export const setDictionary = (dictionary: IEnglishItem[]): SetDictionaryAction => ({type: SET_DICTIONARY, dictionary})
export const addNewWord = (wordItem: IEnglishItem): AddNewWordAction => ({type: ADD_NEW_WORD, wordItem})
export const deleteWordItem = (wordItemId: string): DeleteWordAction => ({type: DELETE_WORD, wordItemId})


export const getDictionary = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await englishAPI.getDictionary()

      dispatch(setDictionary(response))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}
export const addWordToDictionary = (wordEng: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let translate = await englishAPI.translateYandex(wordEng.toLowerCase())
      let wordRu = translate.data.text[0]
      let response = await englishAPI.addWordToDictionary(wordEng.toLowerCase(), wordRu)

      dispatch(addNewWord(response.englishItem))
   } catch (error) {
     getGlobalError(error.response.message)
   }
}

export const deleteWord = (wordId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await englishAPI.deleteWord(wordId)

      dispatch(deleteWordItem(wordId))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}


export default englishReducer;
