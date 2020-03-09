import React, {useState} from 'react';
import Select            from "react-select";
import styles            from "../../VideoPage/VideoPage.module.scss";

const ProjectForm = ({createProject, technologiesOptions, project = {}}) => {
   const [technologies, setTechnologies] = useState(project.technologies || null);
   const [description, setDescription] = useState(project.description || '');
   const [demoLink, setDemoLink] = useState(project.demoLink || '');
   const [gitLink, setGitLink] = useState(project.gitLink || '');

   const handleChange = selectedOption => {
      setTechnologies(selectedOption)
   };

   const inputChangeHandler = e => {
      switch (e.target.name) {
         case 'description':
            setDescription(e.target.value)
            break;
         case 'demoLink':
            setDemoLink(e.target.value)
            break;
         case 'gitLink':
            setGitLink(e.target.value)
            break;
      }
   }

   const onSubmit = e => {
      e.preventDefault()
      createProject(technologies,description,demoLink,gitLink)
      setDescription('')
      setDemoLink('')
      setGitLink('')
      setTechnologies(null)
   }

   return (
      <div>
         <form onSubmit={onSubmit}>
            <label htmlFor="description">Описание проекта</label>
            <input name="description" value={description} onChange={inputChangeHandler} required={true}/>
            <label htmlFor="technologies">Используемые технологии</label>
            <Select style={styles.select} className="customSelect"
                    name="technologies"
                    options={technologiesOptions} classNamePrefix="customSelect"
                    isMulti={true} placeholder={'Выберите используемые технологии'}
                    onChange={handleChange} value={technologies} required={true}/>
            <label htmlFor="demoLink">Ссылка на демо</label>
            <input type="text" name="demoLink" value={demoLink} onChange={inputChangeHandler}/>
            <label htmlFor="gitLink">Ссылка на Github</label>
            <input type="text" name="gitLink" value={gitLink} onChange={inputChangeHandler} required={true}/>
            <button type='submit'>Отправить форму</button>
         </form>
      </div>
   );
}

export default ProjectForm;
