import React, {useState} from 'react';
import ProjectForm       from "../ProjectForm/ProjectForm.jsx";
import styles            from '../ProjectPage.module.scss'

import { FaWindowClose } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

const ProjectItem = ({project, technologiesOptions, deleteProjectItem, updateTodo, editModeHandler}) => {
   const [editMode, setEditMode] = useState(false)

   return (
      <div className={styles.projectItem}>
         {
            editMode
               ? <>
                  <ProjectForm setEditMode={setEditMode} onSubmitHandler={updateTodo} project={project} technologiesOptions={technologiesOptions}/>
                  <div className={styles.btnBlock}>
                     <div className="btns">
                        <TiCancel title="Отменить редактирование" onClick={() => setEditMode(false)} className="closeBtn" size={'2rem'}/>

                     </div>
                  </div>
               </>
               : <>
                  <div>
                     <div>О проекте: {project.description}</div>
                     <ul className={styles.techList}>
                        {
                           project.technologies && project.technologies.map(t => <li key={t.value}>{t.label}</li>)
                        }
                     </ul>
                     <div>
                        Демо: <a href={project.demoLink} target="_blank" rel="noopener noreferrer" >{project.demoLink}</a>
                     </div>
                     <div>
                        GitHub: <a href={project.gitLink} target="_blank" rel="noopener noreferrer" >{project.gitLink}</a>
                     </div>
                  </div>
                  <div className={styles.btnBlock}>
                     <div className="btns">
                        <FaPen title="Редактировать" onClick={() => setEditMode(true)} className="editBtn" size={'1.2rem'}/>
                        <FaWindowClose title="Удалить" onClick={() => deleteProjectItem(project._id)} className="closeBtn" size={'1.6rem'}/>
                     </div>
                  </div>
               </>
         }
      </div>
   );
}

export default ProjectItem;
