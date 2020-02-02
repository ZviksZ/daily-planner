import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AuthPage                  from "./components/AuthPage/AuthPage";
import GlobalError               from "./components/common/GlobalError/GlobalError.jsx";
import Sidebar                   from "./components/Sidebar/Sidebar";
import TodosPage                 from "./components/TodosPage/TodosPage.jsx";


export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <div className="main__wrapper-outer">
            <Sidebar/>
            <GlobalError />
            <div className="main__wrapper-in">
               <Switch>
                  <Route path="/todo">
                     <TodosPage/>
                  </Route>
                  <Route path="/videos">
                     <h1>videos</h1>
                  </Route>
                  <Route path="/features">
                     <h1>features</h1>
                  </Route>
                  <Route path="/patterns">
                     <h1>patterns</h1>
                  </Route>
                  <Route path="/semantic">
                     <h1>semantic</h1>
                  </Route>
                  <Route path="/projects">
                     <h1>projects</h1>
                  </Route>
                  <Route path="/english">
                     <h1>english</h1>
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