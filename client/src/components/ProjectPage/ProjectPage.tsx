import React, {useEffect, useState}                                   from 'react';
import {connect}                                                      from "react-redux";
import {createProject, deleteProjectItem, getProjects, updateProject} from "../../redux/projectReducer";
import ProjectForm                                                    from "./ProjectForm/ProjectForm";
import ProjectItem                                                    from "./ProjectItem/ProjectItem";
import styles                                                         from './ProjectPage.module.scss'
import {AppState}                                                     from "../../redux/store";
import {ThunkDispatch}                                                from "redux-thunk";
import {AppActions}                                                   from "../../types/common_types";
import {bindActionCreators}                                           from "redux";
import {IProject, IProjectTechnologies}                               from "../../types/project_types";

type Props = LinkStateProps & LinkDispatchProps;

const ProjectPage: React.FC<Props> = ({projects, technologiesOptions, getProjects, createProject, deleteProjectItem, updateProject}) => {
   const [addMode, setAddMode] = useState(false)

   useEffect(() => {
      getProjects()
   }, [getProjects])


   return (
      <div className={styles.projectPage}>
         {
            addMode ? <button onClick={() => setAddMode(false)} className='btn-default mb-1'>Закрыть форму</button> : <button onClick={() => setAddMode(true)} className='btn-default mb-1'>Добавить проект</button>
         }
         {
            addMode && <ProjectForm setEditMode={setAddMode} onSubmitHandler={createProject} technologiesOptions={technologiesOptions}/>
         }
         <div className={styles.projectList}>
            {
               projects && projects.map((p: any) => <ProjectItem key={p._id} updateProject={updateProject} deleteProjectItem={deleteProjectItem} project={p} technologiesOptions={technologiesOptions}/>)
            }
         </div>
      </div>
   );
}



interface LinkStateProps {
   projects: IProject[],
   technologiesOptions: IProjectTechnologies[]
}

interface LinkDispatchProps {
   getProjects: () => void
   createProject: (technologies: IProjectTechnologies[], description:string, demoLink:string, gitLink:string) => void
   deleteProjectItem: (projectId:string) => void
   updateProject: (technologies: IProjectTechnologies[], description:string, demoLink:string, gitLink:string, projectId?:string) => void
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      projects: state.projectPage.projects,
      technologiesOptions: state.projectPage.technologiesOptions
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   getProjects: bindActionCreators(getProjects, dispatch),
   createProject: bindActionCreators(createProject, dispatch),
   deleteProjectItem: bindActionCreators(deleteProjectItem, dispatch),
   updateProject: bindActionCreators(updateProject, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
