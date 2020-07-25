import {projectAPI}     from "../api/api";
import {getGlobalError} from "./appReducer";
import {
   ADD_PROJECT,
   DELETE_PROJECT,
   IProject,
   IProjectTechnologies,
   SET_PROJECTS,
   UPDATE_PROJECT,
   ProjectsActionTypes,
   ProjectInitialState,
   UpdateProjectAction,
   AddProjectAction,
   SetProjectsAction,
   DeleteProjectAction
}                       from "../types/project_types";
import {Dispatch}       from "redux";
import {AppActions}     from "../types/common_types";
import {AppState}       from "./store";



let initialState: ProjectInitialState = {
   projects: [],
   technologiesOptions: [
      {value: 'react', label: 'React'},
      {value: 'redux', label: 'Redux'},
      {value: 'axios', label: 'Axios'},
      {value: 'reselect', label: 'Reselect'},
      {value: 'socketio', label: 'SocketIO'},
      {value: 'typescript', label: 'Typescript'},
      {value: 'nodejs', label: 'Node Js'},
      {value: 'react-hooks', label: 'React Hooks'},
      {value: 'react-animation', label: 'React-animation'},
      {value: 'mongodb', label: 'MongoDB'},
      {value: 'nextjs', label: 'Next Js'},
      {value: 'bootstrap', label: 'Bootstrap'},
      {value: 'material', label: 'Material UI'},
      {value: 'react-lazyload', label: 'React-lazyload'},
      {value: 'react-context', label: 'React Context'},
      {value: 'redux-form', label: 'Redux-form'},
      {value: 'formik', label: 'Formik'},
      {value: 'form-validation', label: 'Form validation'},
      {value: 'semantic', label: 'Semantic'},
      {value: 'responsive', label: 'Responsive'},
      {value: 'scss', label: 'Scss'},
      {value: 'jquery', label: 'Jquery'},
      {value: 'bitrix', label: 'bitrix'},
      {value: 'php', label: 'PHP'},
      {value: 'mysql', label: 'MySQL'},
      {value: 'seo', label: 'SEO'},
      {value: 'shema', label: 'Shema'},
      {value: 'react-router', label: 'React-router'},
      {value: 'flux', label: 'Flux'},
      {value: 'redux-thunk', label: 'Redux-thunk'},
      {value: 'redux-saga', label: 'Redux-saga'},
      {value: 'local-storage', label: 'Local Storage'},
      {value: 'firebase', label: 'Firebase'},
      {value: 'heroku', label: 'Heroku'},
      {value: 'netlify', label: 'Netlify'},
      {value: 'mongoose', label: 'Mongoose'},
      {value: 'bcryptjs', label: 'BcryptJs'},
      {value: 'express', label: 'Express'},
      {value: 'express-validator', label: 'Express-validator'},
      {value: 'jsonwebtoken', label: 'Jsonwebtoken'},
      {value: 'shortid', label: 'ShortId'},
      {value: 'pure-js', label: 'Pure Js'}
   ]
};

const projectReducer = (state = initialState, action: ProjectsActionTypes) => {
   switch (action.type) {
      case SET_PROJECTS: {
         return {
            ...state,
            projects: action.projects
         }
      }
      case ADD_PROJECT: {
         return {
            ...state,
            projects: [...state.projects, action.project]
         }
      }
      case DELETE_PROJECT: {
         return {
            ...state,
            projects: state.projects.filter(project => project._id !== action.projectId)
         }
      }

      case UPDATE_PROJECT: {
         return {
            ...state,
            projects: state.projects.map(project => {
               if (project._id === action.projectId) {
                  return {
                     ...project,
                     technologies: action.technologies,
                     description: action.description,
                     demoLink: action.demoLink,
                     gitLink: action.gitLink
                  }
               }
               return project
            })
         }
      }
      default:
         return state;
   }
}


export const setProjects = (projects: IProject[]): SetProjectsAction => ({type: SET_PROJECTS, projects})
export const addProject = (project: IProject): AddProjectAction => ({type: ADD_PROJECT, project})
export const deleteProject = (projectId: string): DeleteProjectAction => ({type: DELETE_PROJECT, projectId})
export const updateProjectItem = (technologies:IProjectTechnologies[], description: string, demoLink: string, gitLink: string, projectId?: string): UpdateProjectAction => ({type: UPDATE_PROJECT, technologies, description, demoLink, gitLink, projectId})


export const getProjects = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await projectAPI.getProjects()
      dispatch(setProjects(response))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}
export const createProject = (technologies:IProjectTechnologies[], description: string, demoLink: string, gitLink: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await projectAPI.createProject(technologies, description, demoLink, gitLink)
      dispatch(addProject(response.project))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}
export const deleteProjectItem = (projectId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await projectAPI.deleteProject(projectId)

      dispatch(deleteProject(projectId))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}

export const updateProject = (technologies:IProjectTechnologies[], description: string, demoLink: string, gitLink: string, projectId?: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await projectAPI.updateProject(technologies, description, demoLink, gitLink, projectId)

      dispatch(updateProjectItem(technologies, description, demoLink, gitLink, projectId))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}



export default projectReducer;
