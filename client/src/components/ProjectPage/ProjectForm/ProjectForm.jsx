import React, {useState} from 'react';
import Select            from "react-select";
import styles            from "../../VideoPage/VideoPage.module.scss";

const ProjectForm = ({onSubmitHandler, technologiesOptions, project = {}}) => {
   const [technologies, setTechnologies] = useState(project.technologies || null);
   const [values, setValues] = useState({
      description: project.description || '',
      demoLink: project.demoLink || '',
      gitLink: project.gitLink || ''
   });

   const handleChange = event => {
      const { name, value } = event.target;
      setValues({
         ...values,
         [name]: value
      });
   };

   const handleChangeSelect = selectedOption => {
      setTechnologies(selectedOption)
   };

   const onSubmit = e => {
      e.preventDefault()
      if (project !== {}) {
         onSubmitHandler(technologies, values.description, values.demoLink,values.gitLink, project._id)
      } else {
         onSubmitHandler(technologies,values.description,values.demoLink,values.gitLink)
      }
      setValues({
         description: '',
         demoLink: '',
         gitLink: ''
      })
      setTechnologies(null)
   }

   return (
      <div>
         <form onSubmit={onSubmit}>
            <label htmlFor="description">Описание проекта</label>
            <input name="description" value={values.description} onChange={handleChange} required={true}/>
            <label htmlFor="technologies">Используемые технологии</label>
            <Select style={styles.select} className="customSelect"
                    name="technologies"
                    options={technologiesOptions} classNamePrefix="customSelect"
                    isMulti={true} placeholder={'Выберите используемые технологии'}
                    onChange={handleChangeSelect} value={technologies} required={true}/>
            <label htmlFor="demoLink">Ссылка на демо</label>
            <input type="text" name="demoLink" value={values.demoLink} onChange={handleChange}/>
            <label htmlFor="gitLink">Ссылка на Github</label>
            <input type="text" name="gitLink" value={values.gitLink} onChange={handleChange} required={true}/>
            <button type='submit'>Отправить форму</button>
         </form>
      </div>
   );
}

export default ProjectForm;
