import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Sidebar                   from "./components/Sidebar/Sidebar";


export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <>
            <Sidebar/>
            <div className="main__wrapper-in">
               <Switch>
                  <Route path="/" exact>
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
                  <Redirect to="/" />
               </Switch>
            </div>
         </>
      )
   }

   return (
      <Switch>
         <Route path="/" exact>
            <div>auth page</div>
         </Route>
         <Redirect to="/" />
      </Switch>
   )
}