import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext}                                         from "../../context/AuthContext.js";
import {useHttp}                                             from "../../hooks/http.hook.js";
import Loader                                                from "../common/Loader/Loader.jsx";
import styles                                                from './TodosPage.module.scss'

const TodosPage = (props) => {
   const [title, setTitle] = useState('');
   const [todos, setTodos] = useState([])
   const {token} = useContext(AuthContext)
   const {loading, request} = useHttp()

   const handleChange = e => {
      setTitle(e.target.value)
   }
   const pressHandler = async e => {
      if (e.key === 'Enter') {
         try {
            await request('/api/todo/generate', 'POST', { title }, {
               Authorization: `Bearer ${token}`
            })
            setTitle('')
            fetchLinks()            
         } catch (e) {}
      }
   }

   const fetchLinks = useCallback(async () => {
      try {
         const fetched = await request('/api/todo', 'GET', null, {
            Authorization: `Bearer ${token}`
         })
         setTodos(fetched)
      } catch (e) {}
   }, [token, request, setTodos])
   
   const deleteTodoItem = async (id) => {
      try {
         await request(`/api/todo/${id}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
         })
         fetchLinks()
      } catch (e) {}
   }

   useEffect(() => {
      fetchLinks()
   }, [fetchLinks])

   if (loading) {
      return <Loader/>
   }
   
   return (
      <div>
         <input type="text" value={title} onChange={handleChange} onKeyPress={pressHandler}/>
         
         {
            todos && todos.map(todo => {
               return (
                  <div id={todo._id} key={todo._id}>
                     {todo.title}
                     <button onClick={() => deleteTodoItem(todo._id)}>delete</button>
                  </div> 
               )
            } )
         }
      </div>
   );
}

export default TodosPage;