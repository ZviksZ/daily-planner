import React, {useState} from 'react';
import styles            from '../TodosPage.module.scss'

import { FaWindowClose } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

const TodoItem = ({todo, deleteTodoItem, updateTodo, completeTodo}) => {
   const [editMode, setEditMode] = useState(false);
   const [title, setTitle] = useState(todo.title)

   const updateItem = () => {
      updateTodo(todo._id, title)
      setEditMode(false)
   }
   const toggleChecked = () => {
      completeTodo(todo._id, !todo.completed)
   }

   return (
      <div id={todo._id} key={todo._id} className={styles.todoItem}>
         { editMode ?
               <>
                  <input type="text"
                         className={styles.editField}
                         value={title}
                         onChange={(e) => setTitle(e.target.value)} />
                  <div className={styles.btns}>
                     <MdRefresh title="Внести изменения" onClick={updateItem} className={styles.editBtn} size={'1.8rem'}/>
                     <TiCancel title="Отменить редактирование" onClick={() => setEditMode(false)} className={styles.closeBtn} size={'2rem'}/>
                  </div>
               </>
               :
               <>
                  <div className={`${styles.formGroup} ${todo.completed && styles.formGroupChecked}`}>
                     <input type="checkbox" id={`chkbox${todo._id}`} checked={todo.completed} onChange={toggleChecked}/>
                     <label htmlFor={`chkbox${todo._id}`}>{todo.title}</label>
                  </div>
                  <div className={styles.btns}>
                     <FaPen title="Редактировать" onClick={() => setEditMode(true)} className={styles.editBtn} size={'1.2rem'}/>
                     <FaWindowClose title="Удалить" onClick={() => deleteTodoItem(todo._id)} className={styles.closeBtn} size={'1.6rem'}/>
                  </div>
               </>
         }
      </div>
   );
}

export default TodoItem;
