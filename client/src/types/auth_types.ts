export const SET_USER_DATA = 'my-social-network/auth/SET_USER_DATA';
export const SET_MESSAGE = 'my-social-network/auth/SET_MESSAGE';
export const SET_ERROR = 'my-social-network/auth/SET_ERROR';
export const SET_READY = 'my-social-network/auth/SET_READY';
export const LOGOUT = 'my-social-network/auth/LOGOUT';

export interface IAuthInitialState {
   token: string,
   message: string,
   error: string,
   userId: string | null,
   ready: boolean,
   email: string
}

export interface SetUserDataPayload {
   token: string
   email: string
   userId: string | null
}
export interface SetUserDataAction {
   type: typeof SET_USER_DATA;
   payload: SetUserDataPayload;
}
export interface SetMessageAction {
   type: typeof SET_MESSAGE;
   message: string;
}
export interface SetErrorAction {
   type: typeof SET_ERROR;
   error: string;
}
export interface SetReadyAction {
   type: typeof SET_READY;
   ready: boolean;
}
export interface LogoutAction {
   type: typeof LOGOUT;
}


export type AuthActionTypes =
   SetUserDataAction
   | SetMessageAction
   | SetErrorAction
   | SetReadyAction
   | LogoutAction;
