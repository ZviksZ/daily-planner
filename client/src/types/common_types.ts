import {AuthActionTypes}  from "./auth_types";
import {AppActionTypes}   from "./app_types";
import {TodosActionTypes} from "./todos_types";
import {ProjectsActionTypes} from "./project_types";
import {VideosActionTypes} from "./video_types";

export type AppActions = AuthActionTypes | AppActionTypes | TodosActionTypes | ProjectsActionTypes | VideosActionTypes;
