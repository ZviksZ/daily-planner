import React, {useState} from 'react';
import styles            from '../TodosPage.module.scss'

const TodoItem = ({todo, deleteTodoItem}) => {
   const [editMode, setEditMode] = useState(false);
   return (
      <div id={todo._id} key={todo._id}>
         {todo.title}
         <button onClick={() => deleteTodoItem(todo._id)}>Удалить</button>
      </div>
   );
}

export default TodoItem;