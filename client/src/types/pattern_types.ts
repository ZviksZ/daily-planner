export const SET_PATTERNS = 'my-social-network/patterns/SET_PATTERNS';
export const ADD_PATTERN = 'my-social-network/patterns/ADD_PATTERN';
export const DELETE_PATTERN = 'my-social-network/patterns/DELETE_PATTERN';
export const UPDATE_PATTERN = 'my-social-network/patterns/UPDATE_PATTERN';
export const SET_SEARCH = 'my-social-network/patterns/SET_SEARCH';

export interface IPattern {
   code: string
   date: string
   description: string
   owner: string
   title: string
   __v: number
   _id: string
}
export interface PatternInitialState {
   patterns: IPattern[]
   search: string
}



export interface SetPatternsAction {
   type: typeof SET_PATTERNS;
   patterns: IPattern[];
}
export interface AddPatternAction {
   type: typeof ADD_PATTERN;
   pattern: IPattern;
}
export interface DeletePatternAction {
   type: typeof DELETE_PATTERN;
   patternId: string;
}
export interface UpdatePatternAction {
   type: typeof UPDATE_PATTERN;
   title: string;
   description: string;
   patternId: string;
}
export interface SetPatternSearchAction {
   type: typeof SET_SEARCH;
   search: string
}


export type PatternsActionTypes =
   SetPatternsAction |
   AddPatternAction |
   DeletePatternAction |
   UpdatePatternAction | SetPatternSearchAction;
