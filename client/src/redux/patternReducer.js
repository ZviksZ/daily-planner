import {patternsAPI}    from "../api/api.js";
import {getGlobalError} from "./appReducer.ts";

const SET_PATTERNS = 'my-social-network/patterns/SET_PATTERNS';
const ADD_PATTERN = 'my-social-network/patterns/ADD_PATTERN';
const DELETE_PATTERN = 'my-social-network/patterns/DELETE_PATTERN';
const UPDATE_PATTERN = 'my-social-network/patterns/UPDATE_PATTERN';
const SET_SEARCH = 'my-social-network/patterns/SET_SEARCH';

let initialState = {
   patterns: [],
   search: ''
};

const patternReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_PATTERNS: {
         return {
            ...state,
            patterns: action.patterns
         }
      }
      case ADD_PATTERN: {
         return {
            ...state,
            patterns: [...state.patterns, action.pattern]
         }
      }
      case DELETE_PATTERN: {
         return {
            ...state,
            patterns: state.patterns.filter(pattern => pattern._id !== action.patternId)
         }
      }
      case UPDATE_PATTERN: {
         return {
            ...state,
            patterns: state.patterns.map(pattern => {
               if (pattern._id === action.patternId) {
                  return { ...pattern, title: action.title, description: action.description }
               }
               return pattern
            })
         }
      }
      case SET_SEARCH: {
         return {
            ...state,
            search: action.search
         }
      }
      default:
         return state;
   }
}

export const setPatterns = patterns => ({type: SET_PATTERNS, patterns})
export const addPattern = pattern => ({type: ADD_PATTERN, pattern})
export const deletePatternItem = patternId => ({type: DELETE_PATTERN, patternId})
export const updatePatternItem = (patternId, title, description) => ({type: UPDATE_PATTERN, patternId, title, description})
export const setSearch = search => ({type: SET_SEARCH, search})

export const getPatterns = () => async (dispatch) => {
   try {
      let response = await patternsAPI.getPatterns()
      dispatch(setPatterns(response))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const createPattern = (title, description) => async dispatch => {
   try {
      let response = await patternsAPI.createPattern(title, description)
      dispatch(addPattern(response.data.pattern))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const deletePattern = (patternId) => async dispatch => {
   try {
      let response = await patternsAPI.deletePattern(patternId)

      dispatch(deletePatternItem(response.data.message._id))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const updatePattern = (patternId, title, description) => async dispatch => {
   try {
      await patternsAPI.updatePattern(patternId, title, description)
      dispatch(updatePatternItem(patternId, title, description))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}






export default patternReducer;
