export const SET_DICTIONARY = 'my-social-network/english/SET_DICTIONARY';
export const ADD_NEW_WORD = 'my-social-network/english/ADD_NEW_WORD';
export const DELETE_WORD = 'my-social-network/english/DELETE_WORD';

export interface IEnglishItem {
   date: string
   owner: string
   wordEng: string
   wordRu: string
   __v: number
   _id: string
}
export interface EnglishInitialState {
   dictionary: IEnglishItem[]
}


export interface SetDictionaryAction {
   type: typeof SET_DICTIONARY;
   dictionary: IEnglishItem[];
}
export interface AddNewWordAction {
   type: typeof ADD_NEW_WORD;
   wordItem: IEnglishItem;
}
export interface DeleteWordAction {
   type: typeof DELETE_WORD;
   wordItemId: string;
}


export type EnglishActionTypes = SetDictionaryAction | AddNewWordAction | DeleteWordAction;
