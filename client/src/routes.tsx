import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPage                  from "./components/AuthPage/AuthPage";
import GlobalError  from "./components/common/GlobalError/GlobalError";
import EnglishPage  from "./components/EnglishPage/EnglishPage";
import {Navbar}     from "./components/Navbar/Navbar";
import PatternsPage from "./components/PatternsPage/PatternsPage";
import ProjectPage  from "./components/ProjectPage/ProjectPage";
import Sidebar      from "./components/Sidebar/Sidebar";
import TodosPage    from "./components/TodosPage/TodosPage";
import VideoPage    from "./components/VideoPage/VideoPage";


export const useRoutes = (isAuthenticated: boolean) => {
   if (isAuthenticated) {
      return (
         <div className="main__wrapper-outer">
            <Navbar/>
            <Sidebar/>
            <GlobalError />
            <div className="main__wrapper-in">
               <Switch>
                  <Route path="/todo">
                     <TodosPage/>
                  </Route>
                  <Route path="/videos">
                     <VideoPage/>
                  </Route>
                  <Route path="/patterns">
                     <PatternsPage/>
                  </Route>
                  <Route path="/projects">
                     <ProjectPage/>
                  </Route>
                  <Route path="/english">
                     <EnglishPage/>
                  </Route>
                  <Route path="/chat">

                  </Route>
                  <Route path="/"
                         render={() => <Redirect from='/' to='/todo'/>}/>
               </Switch>
            </div>
         </div>
      )
   }

   return (
      <div className="main__wrapper-outer flex-center">
         <Switch>
            <Route path="/" exact>
               <AuthPage/>
            </Route>
            <Redirect to="/"/>
         </Switch>
      </div>
   )
}
