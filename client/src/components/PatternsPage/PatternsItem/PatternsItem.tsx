import cn                from "classnames";
import React, {useState} from 'react';
import styles            from '../PatternsPage.module.scss';
import { FaWindowClose } from "react-icons/fa";
import { FaPen }         from "react-icons/fa";
import { MdRefresh }     from "react-icons/md";
import { TiCancel }      from "react-icons/ti";
import {IPattern}        from "../../../types/pattern_types";


type Props = {
   pattern: IPattern
   updatePattern: (patternId: string, title: string, description: string) => void
   deletePattern: (patternId: string) => void
}

const PatternsItem: React.FC<Props> = ({pattern, updatePattern, deletePattern}) => {
   const [editMode, setEditMode] = useState(false);
   const [values, setValues] = useState({title: pattern.title, description: pattern.description});

   const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value})
   }

   const updateItem = () => {
      updatePattern(pattern._id, values.title, values.description)
      setEditMode(false)
   }

   return (
      <div id={pattern._id} key={pattern._id} className={styles.patternItem}>
         { editMode ?
               <>
                  <input type="text"
                         name={'title'}
                         className={styles.editField}
                         value={values.title}
                         onChange={handleChange} />
                  <input type="text"
                         name={'description'}
                         className={styles.editField}
                         value={values.description}
                         onChange={handleChange} />
                  <div className="btns">
                     <MdRefresh title="Внести изменения" onClick={updateItem} className="editBtn" size={'1.8rem'}/>
                     <TiCancel title="Отменить редактирование" onClick={() => setEditMode(false)} className="closeBtn" size={'2rem'}/>
                  </div>
               </>
               :
               <>
                  <div className={styles.formGroup}>
                     <a href={pattern.title} target="_blank" rel="noopener noreferrer" >{pattern.title}</a>
                  </div>
                  <div className={styles.formGroup}>
                     <span>{pattern.description}</span>
                  </div>
                  <div className={cn(styles.btns, "btns")}>
                     <FaPen title="Редактировать" onClick={() => setEditMode(true)} className="editBtn" size={'1.2rem'}/>
                     <FaWindowClose title="Удалить" onClick={() => deletePattern(pattern._id)} className="closeBtn" size={'1.6rem'}/>
                  </div>
               </>
         }
      </div>
   );
}

export default PatternsItem;
