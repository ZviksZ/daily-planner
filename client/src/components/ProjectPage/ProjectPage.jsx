import React, {useEffect}           from 'react';
import {connect}                    from "react-redux";
import {createProject, getProjects} from "../../redux/projectReducer.js";
import ProjectForm                  from "./ProjectForm/ProjectForm.jsx";
import ProjectItem                  from "./ProjectItem/ProjectItem.jsx";
import styles                       from './ProjectPage.module.scss'

const ProjectPage = ({projects, technologiesOptions, getProjects, createProject}) => {
   useEffect(() => {
      getProjects()
   }, [])

   return (
      <div className={styles.projectPage}>
         <ProjectForm createProject={createProject} technologiesOptions={technologiesOptions}/>

         {
            projects && projects.map(p => <ProjectItem project={p} technologiesOptions={technologiesOptions}/>)
         }
      </div>
   );
}

let mapStateToProps = (state) => {
   return {
      projects: state.projectPage.projects,
      technologiesOptions: state.projectPage.technologiesOptions
   }
}

export default connect(mapStateToProps, {getProjects, createProject})(ProjectPage)
