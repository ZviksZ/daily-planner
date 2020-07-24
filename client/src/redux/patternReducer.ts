import {patternsAPI}    from "../api/api";
import {getGlobalError} from "./appReducer";
import {
   ADD_PATTERN,
   AddPatternAction,
   DELETE_PATTERN, DeletePatternAction, IPattern,
   PatternInitialState,
   SET_PATTERNS,
   SET_SEARCH,
   SetPatternsAction,
   SetPatternSearchAction,
   UPDATE_PATTERN,
   UpdatePatternAction,
   PatternsActionTypes
}                       from "../types/pattern_types";
import {Dispatch}       from "redux";
import {AppActions}     from "../types/common_types";
import {AppState}       from "./store";

let initialState: PatternInitialState = {
   patterns: [],
   search: ''
};

const patternReducer = (state = initialState, action: PatternsActionTypes) => {
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

export const setPatterns = (patterns: IPattern[]): SetPatternsAction => ({type: SET_PATTERNS, patterns})
export const addPattern = (pattern: IPattern): AddPatternAction => ({type: ADD_PATTERN, pattern})
export const deletePatternItem = (patternId: string): DeletePatternAction => ({type: DELETE_PATTERN, patternId})
export const updatePatternItem = (patternId: string, title: string, description: string): UpdatePatternAction => ({type: UPDATE_PATTERN, patternId, title, description})
export const setSearch = (search: string): SetPatternSearchAction => ({type: SET_SEARCH, search})




export const getPatterns = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await patternsAPI.getPatterns()
      dispatch(setPatterns(response))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const createPattern = (title: string, description?: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      description = description ? description : '';
      let response = await patternsAPI.createPattern(title, description)
      dispatch(addPattern(response.data.pattern))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const deletePattern = (patternId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await patternsAPI.deletePattern(patternId)

      dispatch(deletePatternItem(response.data.message._id))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const updatePattern = (patternId: string, title: string, description: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await patternsAPI.updatePattern(patternId, title, description)
      dispatch(updatePatternItem(patternId, title, description))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}






export default patternReducer;
