import {createSelector} from "reselect";
import {AppState}       from "../store";
import {IPattern}       from "../../types/pattern_types";

export const getPatternsSelector = (state: AppState) => state.patternPage.patterns;
export const getSearch = (state: AppState) => state.patternPage.search;
export const getFilteredPatterns = createSelector(
   getPatternsSelector,
   getSearch,
   (patterns: IPattern[], search: string) => {
      if (search) {
         return patterns.filter(pattern => pattern.description.toLowerCase().includes(search.toLowerCase()))
      } else {
         return patterns
      }
   }
)
