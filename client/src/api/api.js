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
   updateTodo(todoId, title) {
      return instance.put(`/api/todo/${todoId}`, {title: title});
   },
   completeTodo(todoId, completed) {
      return instance.put(`/api/todo/${todoId}/completed`, {completed: completed});
   }
}
export const videoAPI = {
   getVideos() {
      return instance.get(`/api/video`).then(response => response.data);
   },
   getDataById(videoId) {
      return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyA94xmO9loRS3OEzwickWE2Y8Sk2m2DqN0`).then(response => response.data);
   },
   addVideo(link, name, channelTitle, previewImg) {
      return instance.post(`/api/video/generate`, {link, name, channelTitle, previewImg});
   },
  /* deleteTodo(todoId) {
      return instance.delete(`/api/todo/${todoId}`);
   },
   updateTodo(todoId, title) {
      return instance.put(`/api/todo/${todoId}`, {title: title});
   },
   completeTodo(todoId, completed) {
      return instance.put(`/api/todo/${todoId}/completed`, {completed: completed});
   }*/
}
