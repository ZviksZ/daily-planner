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
      return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDqMbxsgV4RygfAELf7wulWJqhytHw7odk`).then(response => response.data);
   },
   addVideo(link, name, channelTitle, previewImg) {
      return instance.post(`/api/video/generate`, {link, name, channelTitle, previewImg});
   },
   deleteVideo(videoId) {
      return instance.delete(`/api/video/${videoId}`);
   },
   updateVideoStatus(videoId, status) {
      return instance.put(`/api/video/${videoId}`, {status: status});
   }
}

export const englishAPI = {
   translateYandex(word) {
      return axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200212T054253Z.c2b665f20c687880.da3ba37cb9c34d1b71b0757a10fb2957f3aaffa5&text=${word}&lang=ru`)
   },
   getDictionary() {
      return instance.get(`/api/english`).then(response => response.data);
   },
   addWordToDictionary(wordEng, wordRu) {
      return instance.post(`/api/english/generate`, {wordEng, wordRu});
   },
   deleteWord(wordId) {
      return instance.delete(`/api/english/${wordId}`);
   }
}

export const projectAPI = {
   getProjects() {
      return instance.get(`/api/project`).then(response => response.data);
   },
   createProject(technologies, description, demoLink, gitLink) {
      return instance.post(`/api/project/generate`, {
         technologies: technologies,
         description: description,
         demoLink: demoLink,
         gitLink: gitLink
      });
   },
   deleteProject(projectId) {
      return instance.delete(`/api/project/${projectId}`);
   },
   updateProject(technologies, description, demoLink, gitLink, projectId) {
      return instance.put(`/api/project/${projectId}`, {
         technologies: technologies,
         description: description,
         demoLink: demoLink,
         gitLink: gitLink
      });
   }
}

export const patternsAPI = {
   getPatterns() {
      return instance.get(`/api/pattern`).then(response => response.data);
   },
   createPattern(title, description) {
      return instance.post(`/api/pattern/generate`, {title: title, description: description});
   },
   deletePattern(todoId) {
      return instance.delete(`/api/pattern/${todoId}`);
   },
   updatePattern(todoId, title, description) {
      return instance.put(`/api/pattern/${todoId}`, {title: title, description: description});
   }
}
