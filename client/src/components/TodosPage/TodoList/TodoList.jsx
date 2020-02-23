import React    from 'react';
import TodoItem from "../TodoItem/TodoItem.jsx";


const TodoList = ({title, list, updateTodo, deleteTodo, completeTodo}) => {
   return (
      <>
         <h4>{title}</h4>
         {list.length
            ? list.map(todo => <TodoItem key={todo._id}
                                                     todo={todo}
                                                     updateTodo={updateTodo}
                                                     deleteTodoItem={deleteTodo}
                                                     completeTodo={completeTodo}/>)
            :
            <div>Здесь пока ничего нет</div>
         }
      </>
   );
}

export default TodoList;
