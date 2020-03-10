import React, {useEffect, useState}                                from 'react';
import {connect}                                                   from "react-redux";
import {createProject, deleteProjectItem, getProjects, updateTodo} from "../../redux/projectReducer.js";
import ProjectForm                                                 from "./ProjectForm/ProjectForm.jsx";
import ProjectItem                                                 from "./ProjectItem/ProjectItem.jsx";
import styles                                                      from './ProjectPage.module.scss'

const ProjectPage = ({projects, technologiesOptions, getProjects, createProject, deleteProjectItem, updateTodo}) => {
   const [addMode, setAddMode] = useState(false)

   useEffect(() => {
      getProjects()
   }, [])

   return (
      <div className={styles.projectPage}>
         {
            addMode ? <button onClick={() => setAddMode(false)}>Отменить</button> : <button onClick={() => setAddMode(true)}>Добавить проект</button>
         }
         {
            addMode && <ProjectForm createProject={createProject} technologiesOptions={technologiesOptions}/>
         }
         <div className={styles.projectList}>
            {
               projects && projects.map(p => <ProjectItem key={p._id} updateTodo={updateTodo} deleteProjectItem={deleteProjectItem} project={p} technologiesOptions={technologiesOptions}/>)
            }
         </div>
      </div>
   );
}

let mapStateToProps = (state) => {
   return {
      projects: state.projectPage.projects,
      technologiesOptions: state.projectPage.technologiesOptions
   }
}

export default connect(mapStateToProps, {getProjects, createProject, deleteProjectItem, updateTodo})(ProjectPage)
