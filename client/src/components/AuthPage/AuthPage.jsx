import React, {useContext, useEffect, useState} from 'react'
import {AuthContext}                            from "../../context/AuthContext.js";
import {useHttp}                                from "../../hooks/http.hook.js";
import styles                                   from './AuthPage.module.scss'


export const AuthPage = () => {
   const auth = useContext(AuthContext)
   const {loading, error, request, clearError} = useHttp()
   const [message, setMessage] = useState('')
   const [form, setForm] = useState({
      email: '',
      password: ''
   })

   useEffect(() => {
      setTimeout(() => {
         clearError()
         setMessage('')
      }, 3000)      
   }, [error, message, clearError])

   const changeHandler = e => {
      setForm({...form, [e.target.name]: e.target.value})
   }
   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form})
         setMessage(data.message)
      } catch (e) {
      }
   }
   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...form})
         auth.login(data.token, data.userId)
      } catch (e) {
      }
   }

   return (
      <div className={styles.auth}>
         {error && <div className={styles.error}>{error}</div>}
         {message && <div className={`${styles.error} ${styles.success}`}>{message}</div>}
         <h1>Daily planner</h1>
         <div className={styles.authForm}>
            <div className={styles.authFormFields}>
               <h3 className={styles.authFormTitle}>Авторизация</h3>               
               <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                     placeholder="Введите email"
                     onChange={changeHandler}
                     id="email"
                     type="text"
                     name="email"
                     value={form.email}
                  />                  
               </div>

               <div className={styles.field}>
                  <label htmlFor="password">Пароль</label>
                  <input
                     placeholder="Введите пароль"
                     onChange={changeHandler}
                     id="password"
                     type="password"
                     name="password"
                     value={form.password}
                  />
               </div>
            </div>
            <div className={styles.authFormBtns}>
               <button
                  className={styles.btn}
                  onClick={loginHandler}
               >
                  Войти
               </button>
               <button
                  className={styles.btn}
                  onClick={registerHandler}
                  disabled={loading}
               >
                  Регистрация
               </button>
            </div>
         </div>
      </div>
   )
}