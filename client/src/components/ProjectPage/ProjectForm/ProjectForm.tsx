import React, {useState}                from 'react';
import Select                           from "react-select";
import styles                           from "../../VideoPage/VideoPage.module.scss";
import {IProject, IProjectTechnologies} from "../../../types/project_types";


type Props = {
   onSubmitHandler: (technologies: IProjectTechnologies[], description:string, demoLink:string, gitLink:string, projectId?: string) => void
   technologiesOptions: IProjectTechnologies[]
   project?: IProject
   setEditMode: (val: boolean) => void
}

const ProjectForm: React.FC<Props> = ({onSubmitHandler, technologiesOptions, project = {}, setEditMode}) => {
   const [technologies, setTechnologies] = useState(project.technologies || []);
   const [values, setValues] = useState({
      description: project.description || '',
      demoLink: project.demoLink || '',
      gitLink: project.gitLink || ''
   });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues({
         ...values,
         [name]: value
      });
   };

   const handleChangeSelect = (selectedOption: any) => {
      setTechnologies(selectedOption)
   };

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (project !== {}) {
         onSubmitHandler(technologies, values.description, values.demoLink,values.gitLink, project._id);
         setEditMode(false)
      } else {
         onSubmitHandler(technologies,values.description,values.demoLink,values.gitLink)

         setValues({
            description: '',
            demoLink: '',
            gitLink: ''
         })
         setTechnologies([])
      }

   }

   return (
      <div>
         <form onSubmit={onSubmit} className="mb-2">
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
            <button type='submit' className='btn-default mt-1'>Отправить форму</button>
         </form>
      </div>
   );
}

export default ProjectForm;
