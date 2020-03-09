import React, {useEffect}           from 'react';
import {connect}                    from "react-redux";
import {createProject, getProjects} from "../../redux/projectReducer.js";
import ProjectForm                  from "./ProjectForm/ProjectForm.jsx";

const ProjectPage = ({projects,technologiesOptions, getProjects, createProject }) => {
   useEffect(() => {
      getProjects()
   }, [])

   return (
      <div>
         <ProjectForm createProject={createProject} technologiesOptions={technologiesOptions}/>

         {
            projects && projects.map(p => <li>{p.description}</li>)
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
