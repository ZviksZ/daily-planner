import axios   from "axios";
import {ITodo} from "../types/todos_types";

const instance = axios.create({
   /*baseURL: 'https://daily-23.herokuapp.com',*/
   baseURL: 'http://localhost:5000/',
   headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
   }
})

instance.interceptors.request.use(config => {
   const data = JSON.parse(localStorage.getItem('userData')  || '{}')
   const token = data.token

   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config
})

type StandartResponse = {
   message: string
}

export const authAPI = {
   login(email: string, password: string) {
      return instance.post('/api/auth/login', {email, password}).then(response => response.data);
   },
   register(email: string, password: string) {
      return instance.post('/api/auth/register', {email, password}).then(response => response.data);
   },
   verifyAuth(token: string) {
      return instance.post('/api/auth/isauth', {token}).then(response => response.data);
   }
}

export const todosAPI = {
   getTodos() {
      return instance.get<ITodo[]>(`/api/todo`).then(response => response.data);
   },
   createTodo(title: string) {
      return instance.post(`/api/todo/generate`, {title: title});
   },
   deleteTodo(todoId: string) {
      return instance.delete<StandartResponse>(`/api/todo/${todoId}`);
   },
   updateTodo(todoId: string, title: string) {
      return instance.put<StandartResponse>(`/api/todo/${todoId}`, {title: title});
   },
   completeTodo(todoId: string, completed: boolean) {
      return instance.put<StandartResponse>(`/api/todo/${todoId}/completed`, {completed: completed});
   }
}

export const videoAPI = {
   getVideos() {
      return instance.get(`/api/video`).then(response => response.data);
   },
   getDataById(videoId: string) {
      return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDqMbxsgV4RygfAELf7wulWJqhytHw7odk`).then(response => response.data);
   },
   addVideo(link: string, name: string, channelTitle: string, previewImg: string) {
      return instance.post(`/api/video/generate`, {link, name, channelTitle, previewImg});
   },
   deleteVideo(videoId: string) {
      return instance.delete(`/api/video/${videoId}`);
   },
   updateVideoStatus(videoId: string, status: string) {
      return instance.put(`/api/video/${videoId}`, {status: status});
   }
}

export const englishAPI = {
   translateYandex(word: string) {
      return axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200212T054253Z.c2b665f20c687880.da3ba37cb9c34d1b71b0757a10fb2957f3aaffa5&text=${word}&lang=ru`)
   },
   getDictionary() {
      return instance.get(`/api/english`).then(response => response.data);
   },
   addWordToDictionary(wordEng: string, wordRu: string) {
      return instance.post(`/api/english/generate`, {wordEng, wordRu});
   },
   deleteWord(wordId: string) {
      return instance.delete(`/api/english/${wordId}`);
   }
}

type TechnologiesType = {
   value: string,
   label: string
}
export const projectAPI = {
   getProjects() {
      return instance.get(`/api/project`).then(response => response.data);
   },
   createProject(technologies: Array<TechnologiesType>, description: string, demoLink: string, gitLink: string) {
      return instance.post(`/api/project/generate`, {
         technologies: technologies,
         description: description,
         demoLink: demoLink,
         gitLink: gitLink
      });
   },
   deleteProject(projectId: string) {
      return instance.delete(`/api/project/${projectId}`);
   },
   updateProject(technologies: Array<TechnologiesType>, description: string, demoLink: string, gitLink: string, projectId: string) {
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
   createPattern(title: string, description: string) {
      return instance.post(`/api/pattern/generate`, {title: title, description: description});
   },
   deletePattern(todoId: string) {
      return instance.delete(`/api/pattern/${todoId}`);
   },
   updatePattern(todoId: string, title: string, description: string) {
      return instance.put(`/api/pattern/${todoId}`, {title: title, description: description});
   }
}
