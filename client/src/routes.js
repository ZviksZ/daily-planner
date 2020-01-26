import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage}                from "./components/AuthPage/AuthPage";
import Sidebar                   from "./components/Sidebar/Sidebar";


export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <div className="main__wrapper-outer">
            <Sidebar/>

            <div className="main__wrapper-in">
               <Switch>
                  <Route exact path="/"
                         render={() => <Redirect from='/' to='/todo'/>}/>
                  <Route path="/todo">
                     <h1>daily</h1>
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
            {/*<Redirect to="/" />*/}
         </Switch>
      </div>
   )
}