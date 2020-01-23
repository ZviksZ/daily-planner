import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Sidebar                   from "./components/Sidebar/Sidebar.jsx";


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
                  <Route path="/work">
                     <h1>work</h1>
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