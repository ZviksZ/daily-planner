import React, {useState} from 'react';
import ProjectForm       from "../ProjectForm/ProjectForm.jsx";
import styles            from '../ProjectPage.module.scss'

import { FaWindowClose } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

const ProjectItem = ({project, technologiesOptions}) => {
   const [editMode, setEditMode] = useState(false)

   return (
      <div>
         {
            editMode
               ? <>
                  <ProjectForm project={project} technologiesOptions={technologiesOptions}/>
                  <div className={styles.btnBlock}>
                     <MdRefresh title="Внести изменения" onClick={() => console.log('111')} className={styles.editBtn} size={'1.8rem'}/>
                     <TiCancel title="Отменить редактирование" onClick={() => setEditMode(false)} className={styles.closeBtn} size={'2rem'}/>
                  </div>
               </>
               : <>
                  <div>
                     <div>О проекте:{project.description}</div>
                     <ul>
                        {
                           project.technologies && project.technologies.map(t => <li id={t.value}>{t.label}</li>)
                        }
                     </ul>
                     <div>
                        Демо:<a href={project.demoLink} target="_blank">{project.demoLink}</a>
                     </div>
                     <div>
                        GitHub:<a href={project.gitLink} target="_blank">{project.gitLink}</a>
                     </div>
                  </div>
                  <div className={styles.btnBlock}>
                     <FaPen title="Редактировать" onClick={() => setEditMode(true)} className={styles.editBtn} size={'1.2rem'}/>
                     <FaWindowClose title="Удалить" onClick={() => console.log('111')} className={styles.closeBtn} size={'1.6rem'}/>
                  </div>
               </>
         }
      </div>
   );
}

export default ProjectItem;
