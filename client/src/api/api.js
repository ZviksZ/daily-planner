import * as axios from "axios";


const instance = axios.create({
   /*withCredentials: true,
   headers: {
      Authorization: `Bearer ${token}`
   }*/
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
      return instance.get(`todo-lists`).then(response => response.data);
   },
   createTodolist(title) {
      return instance.post(`todo-lists`, {title: title});
   },
   deleteTodolist(todolistId) {
      return instance.delete(`todo-lists/${todolistId}`);
   },
   updateTodolistTitle(todolistId, title) {
      return instance.put(`todo-lists/${todolistId}`, {title: title});
   },
   getTodolistTasks(todolistId, itemsPortion, pageSize) {
      return instance.get(`todo-lists/${todolistId}/tasks?page=${itemsPortion}&count=${pageSize}`).then(response => response.data);
   },
   createNewTask(todolistId, title) {
      return instance.post(`todo-lists/${todolistId}/tasks`, {title: title});
   },
   updateTask(todolistId, taskId, newItem) {
      return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {
         status: {
            title: newItem.title,
            description: newItem.description,
            completed: newItem.completed,
            status: newItem.status,
            priority: newItem.priority,
            startDate: newItem.startDate,
            deadline: newItem.deadline
         }
      });
   },
   deleteTask(todolistId, taskId) {
      return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
   }

}