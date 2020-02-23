import {englishAPI}     from "../api/api.js";
import {getGlobalError} from "./appReducer.js";

const SET_DICTIONARY = 'my-social-network/english/SET_DICTIONARY';
const ADD_NEW_WORD = 'my-social-network/english/ADD_NEW_WORD';
const DELETE_WORD = 'my-social-network/english/DELETE_WORD';

let initialState = {
   dictionary: [],
};

const englishReducer = (state = initialState, action) => {

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

export const setDictionary = dictionary => ({type: SET_DICTIONARY, dictionary})
export const addNewWord = wordItem => ({type: ADD_NEW_WORD, wordItem})
export const deleteWordItem = wordItemId => ({type: DELETE_WORD, wordItemId})


export const getDictionary = () => async (dispatch) => {
   try {
      let response = await englishAPI.getDictionary()

      dispatch(setDictionary(response))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const addWordToDictionary = (wordEng) => async dispatch => {
   try {
      let translate = await englishAPI.translateYandex(wordEng.toLowerCase())
      let wordRu = translate.data.text[0]
      let response = await englishAPI.addWordToDictionary(wordEng.toLowerCase(), wordRu)

      dispatch(addNewWord(response.data.englishItem))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}

export const deleteWord = (wordId) => async dispatch => {
   try {
      let response = await englishAPI.deleteWord(wordId)

      dispatch(deleteWordItem(response.data.message._id))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}


export default englishReducer;
