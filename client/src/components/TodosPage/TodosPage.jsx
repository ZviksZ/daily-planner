import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp}                                             from "../../hooks/http.hook.js";
import Loader                                                from "../common/Loader/Loader.jsx";
import TodoItem                                              from "./TodoItem/TodoItem.jsx";
import styles                                                from './TodosPage.module.scss'

const TodosPage = () => {
 /*  const [title, setTitle] = useState('');
   const [todos, setTodos] = useState([])
   const {token, logout} = useContext(AuthContext)
   const {loading, request} = useHttp()

   const handleChange = e => {
      setTitle(e.target.value)
   }
   const pressHandler = async e => {
      if (e.key === 'Enter') {
         try {
            await request('/api/todo/generate', 'POST', {title}, {
               Authorization: `Bearer ${token}`
            })
            setTitle('')
            fetchLinks()
         } catch (e) {
         }
      }
   }

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
   }, [fetchLinks])

   if (loading) {
      return <Loader/>
   }*/
   return (
      <div>todos page</div>         
   )
}

export default TodosPage;

{/*<div>
         <input type="text" value={title} onChange={handleChange} onKeyPress={pressHandler}/>
         {
            todos && todos.map(todo => <TodoItem key={todo._id} todo={todo} deleteTodoItem={deleteTodoItem}/>)
         }
      </div>*/}   