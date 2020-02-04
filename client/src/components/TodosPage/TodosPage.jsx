import React, {useEffect}                                           from 'react';
import {connect}                                                    from "react-redux";
import {getTodosCompleted, getTodosNoCompleted}                     from "../../redux/selectors/todoSelectors.js";
import {completeTodo, createTodo, deleteTodo, getTodos, updateTodo} from "../../redux/todoReducer.js";
import AddItemForm                                                  from "../common/AddItemForm/AddItemForm.jsx";
import Loader                                                       from "../common/Loader/Loader.jsx";
import TodoItem                                                     from "./TodoItem/TodoItem.jsx";
import styles                                                       from './TodosPage.module.scss'

const TodosPage = ({completedTodos, noCompletedTodos, getTodos,
                      createTodo, deleteTodo, loading,
                      todos, updateTodo, completeTodo}) => {
   useEffect(() => {
      getTodos()
   }, [getTodos])

   if (loading) {
      return <Loader/>
   }
   return (
      <div className={styles.todoPage}>
         <h3>Список задач</h3>
         <AddItemForm onSend={createTodo} placeholder={'Введите новую задачу'}/>
         <div className={styles.todosList}>
            <div className={styles.todoInWork}>
               <h4>На выполнении</h4>
               {noCompletedTodos.length
                     ? noCompletedTodos.map(todo => <TodoItem key={todo._id}
                                                              todo={todo}
                                                              updateTodo={updateTodo}
                                                              deleteTodoItem={deleteTodo}
                                                              completeTodo={completeTodo}/>)
                     :
                     <div>Здесь пока ничего нет</div>
               }
            </div>
            <div className={styles.todoCompleted}>
               <h4>Завершенные</h4>
               {completedTodos.length
                     ? completedTodos.map(todo => <TodoItem key={todo._id}
                                                            todo={todo}
                                                            updateTodo={updateTodo}
                                                            deleteTodoItem={deleteTodo}
                                                            completeTodo={completeTodo}/>)
                     :
                     <div>Здесь пока ничего нет</div>
               }
            </div>
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      loading: state.common.loading,
      todos: state.todoPage.todos,
      completedTodos: getTodosCompleted(state),
      noCompletedTodos: getTodosNoCompleted(state)
   }
}

export default connect(mapStateToProps, {getTodos, createTodo, deleteTodo, updateTodo, completeTodo})(TodosPage)

