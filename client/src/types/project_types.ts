export const SET_PROJECTS = 'my-social-network/projects/SET_PROJECTS';
export const ADD_PROJECT = 'my-social-network/projects/ADD_PROJECT';
export const DELETE_PROJECT = 'my-social-network/projects/DELETE_PROJECT';
export const UPDATE_PROJECT = 'my-social-network/projects/UPDATE_PROJECT';

export interface IProjectTechnologies {
   value: string
   label: string
}
export interface IProject {
   date: string
   demoLink: string
   description: string
   gitLink: string
   owner: string
   technologies: IProjectTechnologies[]
   __v: number
   _id: string
}
export interface ProjectInitialState {
   projects: IProject[],
   technologiesOptions: IProjectTechnologies[]
}


export interface SetProjectsAction {
   type: typeof SET_PROJECTS;
   projects: IProject[];
}
export interface AddProjectAction {
   type: typeof ADD_PROJECT;
   project: IProject;
}
export interface DeleteProjectAction {
   type: typeof DELETE_PROJECT;
   projectId: string;
}
export interface UpdateProjectAction {
   type: typeof UPDATE_PROJECT;
   technologies:IProjectTechnologies[];
   description: string;
   demoLink: string;
   gitLink: string;
   projectId: string;
}


export type ProjectsActionTypes =
   SetProjectsAction |
   AddProjectAction |
   DeleteProjectAction |
   UpdateProjectAction;
