import React, {useEffect, useState}                                 from 'react';
import {connect}                                                    from "react-redux";
import {completeTodo, createTodo, deleteTodo, getTodos, updateTodo} from "../../redux/todoReducer.js";
import AddItemForm                                                  from "../common/AddItemForm/AddItemForm.jsx";
import Loader                                                       from "../common/Loader/Loader.jsx";
import TodoItem                                                     from "./TodoItem/TodoItem.jsx";
import styles                                                       from './TodosPage.module.scss'

const TodosPage = ({getTodos, createTodo, deleteTodo, loading, todos, updateTodo, completeTodo}) => {

   useEffect(() => {
      getTodos()
   }, [getTodos])

   if (loading) {
      return <Loader/>
   }
   return (
      <div className={styles.todoPage}>
         <AddItemForm onSend={createTodo} placeholder={'Введите новую задачу'}/>
         <div className={styles.todosList}>
            <h3>Список задач</h3>
            {
               todos && todos.map(todo => <TodoItem key={todo._id} 
                                                    todo={todo} 
                                                    updateTodo={updateTodo} 
                                                    deleteTodoItem={deleteTodo}
                                                    completeTodo={completeTodo}
               />)
            }
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      loading: state.common.loading,
      todos: state.todoPage.todos
   }
}

export default connect(mapStateToProps, {getTodos, createTodo, deleteTodo, updateTodo, completeTodo})(TodosPage)

