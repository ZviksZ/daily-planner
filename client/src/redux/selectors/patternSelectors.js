import {createSelector} from "reselect";

export const getPatternsSelector = state => state.patternPage.patterns;
export const getSearch = state => state.patternPage.search;
export const getFilteredPatterns = createSelector(
   getPatternsSelector,
   getSearch,
   (patterns, search) => {
      if (search) {
         return patterns.filter(pattern => pattern.description.toLowerCase().includes(search.toLowerCase()))
      } else {
         return patterns
      }
   }
)
