import React, {useState} from 'react';
import styles            from '../TodosPage.module.scss'

import { FaWindowClose } from "react-icons/fa";
import { FaPen }         from "react-icons/fa";
import { MdRefresh }     from "react-icons/md";
import { TiCancel }      from "react-icons/ti";
import {ITodo}           from "../../../types/todos_types";


interface TodoItemProps {
   todo: ITodo
   deleteTodo: (todoId:string) => void
   updateTodo: (todoId:string, title:string) => void
   completeTodo: (todoId:string, completed:boolean) => void
}

const TodoItem: React.FC<TodoItemProps>  = ({todo, deleteTodo, updateTodo, completeTodo}) => {
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
                  <div className="btns">
                     <MdRefresh title="Внести изменения" onClick={updateItem} className="editBtn"  size={'1.8rem'}/>
                     <TiCancel title="Отменить редактирование" onClick={() => setEditMode(false)} className="closeBtn" size={'2rem'}/>
                  </div>
               </>
               :
               <>
                  <div className={`${styles.formGroup} ${todo.completed && styles.formGroupChecked}`}>
                     <input type="checkbox" id={`chkbox${todo._id}`} checked={todo.completed} onChange={toggleChecked}/>
                     <label htmlFor={`chkbox${todo._id}`}>{todo.title}</label>
                  </div>
                  <div className="btns">
                     <FaPen title="Редактировать" onClick={() => setEditMode(true)} className="editBtn" size={'1.2rem'}/>
                     <FaWindowClose title="Удалить" onClick={() => deleteTodo(todo._id)} className="closeBtn" size={'1.6rem'}/>
                  </div>
               </>
         }
      </div>
   );
}

export default TodoItem;
