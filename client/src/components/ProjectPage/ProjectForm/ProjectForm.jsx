import React, {useState} from 'react';
import Select            from "react-select";
import styles            from "../../VideoPage/VideoPage.module.scss";

const ProjectForm = ({createProject, technologiesOptions}) => {
   const [technologies, setTechnologies] = useState(null);
   const [description, setDescription] = useState('');
   const [demoLink, setDemoLink] = useState('');
   const [gitLink, setGitLink] = useState('');

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
   }

   return (
      <div>
         <form onSubmit={onSubmit}>
            <label htmlFor="description">Описание проекта</label>
            <textarea name="description" value={description} onChange={inputChangeHandler}/>
            <label htmlFor="technologies">Используемые технологии</label>
            <Select style={styles.select} className="customSelect"
                    name="technologies"
                    options={technologiesOptions} classNamePrefix="customSelect"
                    isMulti={true} placeholder={'Выберите используемые технологии'}
                    onChange={handleChange} value={technologies}/>
            <label htmlFor="demoLink">Ссылка на демо</label>
            <input type="text" name="demoLink" value={demoLink} onChange={inputChangeHandler}/>
            <label htmlFor="gitLink">Ссылка на Github</label>
            <input type="text" name="gitLink" value={gitLink} onChange={inputChangeHandler}/>
            <button type='submit'>Отправить форму</button>
         </form>
      </div>
   );
}

export default ProjectForm;
