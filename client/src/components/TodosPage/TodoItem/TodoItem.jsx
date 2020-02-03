import React, {useState} from 'react';
import styles            from '../TodosPage.module.scss'

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
      <div id={todo._id} key={todo._id}>
         {
            editMode ?
               <>                  
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <button onClick={updateItem}>Обновить</button>
                  <button onClick={() => setEditMode(false)}>Отменить</button>
               </>
               :
               <>
                  <div className={styles.formGroup}>
                     <input type="checkbox" 
                            id={`chkbox${todo._id}`} 
                            checked={todo.completed} 
                            onChange={toggleChecked}/>
                     <label htmlFor={`chkbox${todo._id}`}>{todo.title}</label>
                  </div>
                  <button onClick={() => setEditMode(true)}>Редактировать</button>
                  <button onClick={() => deleteTodoItem(todo._id)}>Удалить</button>
               </>               
         }         
      </div>
   );
}

export default TodoItem;