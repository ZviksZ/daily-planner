import React    from 'react';
import TodoItem from "../TodoItem/TodoItem";
import {ITodo}  from "../../../types/todos_types";


interface TodoListProps {
   title: string
   list: ITodo[]
   deleteTodo: (todoId:string) => void
   updateTodo: (todoId:string, title:string) => void
   completeTodo: (todoId:string, completed:boolean) => void
}


const TodoList: React.FC<TodoListProps> = ({title, list, updateTodo, deleteTodo, completeTodo}) => {
   return (
      <>
         <h4>{title}</h4>
         {list.length
            ? list.map(todo => <TodoItem key={todo._id}
                                                     todo={todo}
                                                     updateTodo={updateTodo}
                                                      deleteTodo={deleteTodo}
                                                     completeTodo={completeTodo}/>)
            :
            <div>Здесь пока ничего нет</div>
         }
      </>
   );
}

export default TodoList;
