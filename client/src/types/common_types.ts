import {AuthActionTypes}  from "./auth_types";
import {AppActionTypes}   from "./app_types";
import {TodosActionTypes} from "./todos_types";

export type AppActions = AuthActionTypes | AppActionTypes | TodosActionTypes;
