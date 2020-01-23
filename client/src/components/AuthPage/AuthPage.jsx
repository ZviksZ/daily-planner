import React, {useContext, useEffect, useState} from 'react'
import {AuthContext}                            from "../../context/AuthContext.js";
import {useHttp}                                from "../../hooks/http.hook.js";
import {useMessage}                             from "../../hooks/message.hook.js";


export const AuthPage = () => {
   const auth = useContext(AuthContext)
   const message = useMessage()
   const {loading, error, request, clearError} = useHttp()
   const [form, setForm] = useState({
      email: '',
      password: ''
   })

   useEffect(() => {
      message(error)
      clearError()
   }, [error, message, clearError])

   /*useEffect(() => {
      window.M.updateTextFields()
   }, [])*/

   const changeHandler = e => {
      setForm({...form, [e.target.name]: e.target.value})
   }
   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form})
         console.log(data)
         message(data.message)
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
      <div className="row">
         <div className="col s6 offset-s3">
            <h1>Сократи Ссылку</h1>
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Авторизация</span>
                  <div>

                     <div className="input-field">
                        <input
                           placeholder="Введите email"
                           onChange={changeHandler}
                           id="email"
                           type="text"
                           name="email"
                           className="yellow-input"
                           value={form.email}
                        />
                        <label htmlFor="email">Email</label>
                     </div>

                     <div className="input-field">
                        <input
                           placeholder="Введите пароль"
                           onChange={changeHandler}
                           id="password"
                           type="password"
                           name="password"
                           className="yellow-input"
                           value={form.password}
                        />
                        <label htmlFor="password">Пароль</label>
                     </div>

                  </div>
               </div>
               <div className="card-action">
                  <button
                     className="btn yellow darken-4"
                     style={{marginRight: 10}}
                     onClick={loginHandler}
                  >
                     Войти
                  </button>
                  <button
                     className="btn grey lighten-1 black-text"
                     onClick={registerHandler}
                     disabled={loading}
                  >
                     Регистрация
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}