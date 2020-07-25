import axios                  from "axios";
import {ITodo}                from "../types/todos_types";
import {IProjectTechnologies, IProject} from "../types/project_types";
import {IVideo}               from "../types/video_types";
import {IPattern}             from "../types/pattern_types";
import {IEnglishItem}         from "../types/english_types";

const instance = axios.create({
   /*baseURL: 'https://daily-23.herokuapp.com',*/
   baseURL: 'http://localhost:8888/',
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

interface StandartResponse {
   message: string
}

interface Auth {
   token: string
   userId: string
}
interface VerifyAuth {
   exp: number
   iat: number
   userId: string
}
export const authAPI = {
   login(email: string, password: string) {
      return instance.post<Auth>('/api/auth/login', {email, password}).then(response => response.data);
   },
   register(email: string, password: string) {
      return instance.post<StandartResponse>('/api/auth/register', {email, password}).then(response => response.data);
   },
   verifyAuth(token: string) {
      return instance.post<VerifyAuth>('/api/auth/isauth', {token}).then(response => response.data);
   }
}




interface CreateTodo {
   todo: ITodo
}
export const todosAPI = {
   getTodos() {
      return instance.get<ITodo[]>(`/api/todo`).then(response => response.data);
   },
   createTodo(title: string) {
      return instance.post<CreateTodo>(`/api/todo/generate`, {title: title}).then(response => response.data);
   },
   deleteTodo(todoId: string) {
      return instance.delete<StandartResponse>(`/api/todo/${todoId}`).then(response => response.data);
   },
   updateTodo(todoId: string, title: string) {
      return instance.put<StandartResponse>(`/api/todo/${todoId}`, {title: title}).then(response => response.data);
   },
   completeTodo(todoId: string, completed: boolean) {
      return instance.put<StandartResponse>(`/api/todo/${todoId}/completed`, {completed: completed}).then(response => response.data);
   }
}



interface AddVideo {
   video: IVideo
}
export const videoAPI = {
   getVideos() {
      return instance.get<IVideo[]>(`/api/video`).then(response => response.data);
   },
   getDataById(videoId: string) {
      return axios.get<any>(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDqMbxsgV4RygfAELf7wulWJqhytHw7odk`).then(response => response.data);
   },
   addVideo(link: string, name: string, channelTitle: string, previewImg: string) {
      return instance.post<AddVideo>(`/api/video/generate`, {link, name, channelTitle, previewImg}).then(response => response.data);
   },
   deleteVideo(videoId: string) {
      return instance.delete<StandartResponse>(`/api/video/${videoId}`).then(response => response.data);
   },
   updateVideoStatus(videoId: string, status: string) {
      return instance.put<StandartResponse>(`/api/video/${videoId}`, {status: status}).then(response => response.data);
   }
}


interface AddWord {
   englishItem: IEnglishItem
}
export const englishAPI = {
   translateYandex(word: string) {
      return axios.get<any>(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200212T054253Z.c2b665f20c687880.da3ba37cb9c34d1b71b0757a10fb2957f3aaffa5&text=${word}&lang=ru`)
   },
   getDictionary() {
      return instance.get<IEnglishItem[]>(`/api/english`).then(response => response.data);
   },
   addWordToDictionary(wordEng: string, wordRu: string) {
      return instance.post<AddWord>(`/api/english/generate`, {wordEng, wordRu}).then(response => response.data);
   },
   deleteWord(wordId: string) {
      return instance.delete<StandartResponse>(`/api/english/${wordId}`).then(response => response.data);
   }
}


interface AddProject {
   project: IProject
}
export const projectAPI = {
   getProjects() {
      return instance.get<IProject[]>(`/api/project`).then(response => response.data);
   },
   createProject(technologies:IProjectTechnologies[], description: string, demoLink: string, gitLink: string) {
      return instance.post<AddProject>(`/api/project/generate`, {
         technologies: technologies,
         description: description,
         demoLink: demoLink,
         gitLink: gitLink
      }).then(response => response.data);
   },
   deleteProject(projectId: string) {
      return instance.delete<StandartResponse>(`/api/project/${projectId}`).then(response => response.data);
   },
   updateProject(technologies: IProjectTechnologies[], description: string, demoLink: string, gitLink: string, projectId?: string) {
      return instance.put<StandartResponse>(`/api/project/${projectId}`, {
         technologies: technologies,
         description: description,
         demoLink: demoLink,
         gitLink: gitLink
      }).then(response => response.data);
   }
}

interface AddPattern {
   pattern: IPattern
}
export const patternsAPI = {
   getPatterns() {
      return instance.get<IPattern[]>(`/api/pattern`).then(response => response.data);
   },
   createPattern(title: string, description: string) {
      return instance.post<AddPattern>(`/api/pattern/generate`, {title: title, description: description}).then(response => response.data);
   },
   deletePattern(patternId: string) {
      return instance.delete<StandartResponse>(`/api/pattern/${patternId}`).then(response => response.data);
   },
   updatePattern(patternId: string, title: string, description: string) {
      return instance.put<StandartResponse>(`/api/pattern/${patternId}`, {title: title, description: description}).then(response => response.data);
   }
}
