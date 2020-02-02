import * as axios                from "axios";

const instance = axios.create({
   withCredentials: true
})

instance.interceptors.request.use(config => {
   const data = JSON.parse(localStorage.getItem('userData')) || ''
   const token = data.token

   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }  
   
   return config
})

export const authAPI = {
   login(email, password) {
      return instance.post('/api/auth/login', {email, password}).then(response => response.data);
   },
   register(email, password) {
      return instance.post('/api/auth/register', {email, password}).then(response => response.data);
   }
}
export const todosAPI = {
   getTodos() {
      return instance.get(`/api/todo`).then(response => response.data);
   },
   createTodo(title) {
      return instance.post(`/api/todo/generate`, {title: title});
   },
   deleteTodo(todoId) {
      return instance.delete(`/api/todo/${todoId}`);
   },
   updateTodolistTitle(todolistId, title) {
      return instance.put(`todo-lists/${todolistId}`, {title: title});
   },

}