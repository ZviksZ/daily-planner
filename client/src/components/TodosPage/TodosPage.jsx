import React, {useEffect, useState}       from 'react';
import {connect}                          from "react-redux";
import {createTodo, deleteTodo, getTodos} from "../../redux/todoReducer.js";
import Loader                             from "../common/Loader/Loader.jsx";
import TodoItem                           from "./TodoItem/TodoItem.jsx";
import styles                             from './TodosPage.module.scss'

const TodosPage = ({getTodos, createTodo, deleteTodo, loading, todos}) => {
   useEffect(() => {
      getTodos()
   },[])
   const [title, setTitle] = useState('');

   /*

   const fetchLinks = useCallback(async () => {
      try {
         const fetched = await request('/api/todo', 'GET', null, {
            Authorization: `Bearer ${token}`
         })
         setTodos(fetched)
      } catch (e) {
         logout()
      }
   }, [token, request, logout])

   const deleteTodoItem = async id => {
      try {
         await request(`/api/todo/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
         })
         fetchLinks()
      } catch (e) {
      }
   }

   const updateTodoItem = async (id, title) => {
      try {
         await request(`/api/todo/${id}`, 'PUT', {title}, {
            Authorization: `Bearer ${token}`
         })
         fetchLinks()
      } catch (e) {
      }
   }

   useEffect(() => {
      fetchLinks()
   }, [fetchLinks])*/
   const handleChange = e => {
      setTitle(e.target.value)
   }
   const pressHandler = async e => {
      if (e.key === 'Enter') {
         createTodo(title)
         setTitle('')
      }
   }
   if (loading) {
      return <Loader/>
   }
   return (
      <div>
         <input type="text" value={title} onChange={handleChange} onKeyPress={pressHandler}/>
         {
            todos && todos.map(todo => <TodoItem key={todo._id} todo={todo} deleteTodoItem={deleteTodo}/>)
           /* todos && todos.map(todo => <TodoItem key={todo._id} todo={todo} deleteTodoItem={deleteTodoItem}/>)*/
         }
      </div>
   )
}
let mapStateToProps = (state) => {
   return {
      loading: state.common.loading,
      todos: state.todoPage.todos
   }
}

export default connect(mapStateToProps, {getTodos, createTodo, deleteTodo})(TodosPage)

